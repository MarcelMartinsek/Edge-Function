// this file was used to test the functionalities of the edge function
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

async function getData() {
    const url = "https://plrichaaycunyoldzsaj.supabase.co/functions/v1/order_operations";
    try {
        const response = await fetch(
            url,
            {
                method: "POST",
                body: JSON.stringify(example_order)
            }

        );
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
}

getData();