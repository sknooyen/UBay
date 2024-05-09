
let test_product = {
    category: ['Test'], 
    condition: "New",  
    description: "testing",
    favorite_id: ["test@umass.edu"],
    report_count: ["test@umass.edu"],
    id_email: "test@umass.edu",
    imageURL: ['https://thumbs.dreamstime.com/b/coconut-12976019.jpg'],
    price: 1,
    title: "Test",
};

test('posting a product', async () => {
    let response = await fetch('http://localhost:8000/api/products', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(test_product)
    });
    console.log(response);
    expect(response.status).toBe(200);
});

test('Getting product', async () => {
    let response = await fetch('http://localhost:8000/api/products?id_email=test@umass.edu');
    let data = await response.json();
    console.log(data)
    test_product["_id"] = data[0]["_id"];
    console.log(test_product);
    expect(data[0].title).toBe(test_product.title);
});

test('Updating product', async () => {
    test_product["price"] = 2
    let err = false
    await fetch(`http://localhost:8000/api/products/${test_product._id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(test_product)
    }).then(res => {
        console.log(res);
    }).catch(error => {
        console.error("Error", error);
        err = true
    })
    let response = await fetch('http://localhost:8000/api/products?id_email=test@umass.edu');
    let data = await response.json();
    expect(data[0].price).toBe(2);
});

test('Deleting a product', async () => {
    let response = await fetch(`http://localhost:8000/api/products/${test_product._id}`, {
        method: "DELETE"
    });
    console.log(response);
    expect(response.status).toBe(200);
});
