/*TASK:
• Accept a POST request with a body containing a JSON representation of a new order
====== Example Order:
const example_order = {
    "profile_id": "de56d4fb-de2b-43a5-b2c4-0942f51da661",
    "shipping_address": "Dunajska cesta 1, 1000 Ljubljana",
    "recipient_name": "Goran Dragič",
    "order_item_quantities": [//[id,quantity]
        [1, 2],
        [2, 4],
        [3, 1],
        [5, 3],
    ]
};
======

• Inside the edge function, the order and order items should be inserted into the
database
• Calculate the order totals of all the other orders inside the database and return the
value
*/
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

// Setup type definitions for built-in Supabase Runtime APIs
import { Database } from "../supabase.ts";

interface Order_creation_obj {
  profile_id: string;
  shipping_address: string;
  recipient_name: string;
  order_item_quantities: number[][];
}

const UUID_pattern = new RegExp(
  "^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$",
  "i",
);

const validate_uuid = (str: string) => {
  return UUID_pattern.test(str);
};

Deno.serve(async (req: Request) => {
  const {
    profile_id,
    recipient_name,
    shipping_address,
    order_item_quantities,
  }: Order_creation_obj = await req.json();

  if (req.method !== "POST") {
    return new Response("not allowed", { status: 400 });
  } else if (
    !profile_id || !validate_uuid(profile_id) || !recipient_name ||
    !shipping_address || !order_item_quantities ||
    !(order_item_quantities.length > 0) ||
    !(order_item_quantities.every((pair) =>
      pair.every((x) => (typeof x === "number"))
    ))
  ) {
    return new Response("Invalid infromation in body!", { status: 400 });
  }

  const supabase = createClient<Database>(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    // {
    //   global: { headers: { Authorization: req.headers.get("Authorization")! } },
    // },
  );

  const { data: orders_data, error: error1 } = await supabase.from(
    "orders_data",
  ).select(
    "item_list",
  );
  if (error1) {
    return new Response("Internal Error!", { status: 500 });
  }

  let sum_of_totals = 0;
  for (let i = 0; i < orders_data.length; i++) {
    const cart = orders_data[i].item_list;
    if (cart) {
      for (let j = 0; j < cart.length; j++) {
        const item = cart[j];
        sum_of_totals += item.price * item.quantity;
      }
    }
  }

  const { error: error2, data: order_numbers } = await supabase.from("orders")
    .insert({
      profile_id,
      shipping_address,
      recipient_name,
    }).select("order_number");
  if (error2) {
    return new Response("Internal Error!", { status: 500 });
  }

  const order_items_array = order_item_quantities.map(
    (order_item) => {
      const item_id = order_item[0];
      const quantity = order_item[1];
      const { order_number } = order_numbers[0];
      return { order_number, item_id, quantity };
    },
  );

  const { error: error3 } = await supabase.from("order_items")
    .insert(
      order_items_array,
    );
  if (error3) {
    return new Response("Internal Error!", { status: 500 });
  }

  return new Response(
    JSON.stringify(sum_of_totals),
    { headers: { "Content-Type": "application/json" } },
  );
});
