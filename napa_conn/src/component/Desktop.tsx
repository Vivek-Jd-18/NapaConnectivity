import React, { useState, useEffect } from 'react'

export const Desktop = () => {

    const [shopCart, setShopCart] = useState({
        seller: "",
        salePrice: 0,
        TokenType: 0,
        uri: "",
        tra_napa: "false",
        setSale: "false"
    });
    const handleChange = (e: any) => {
        console.log(shopCart)
        let updatedValue = {};
        updatedValue = { item1: e.target.value };
        setShopCart(shopCart => ({
            ...shopCart,
            ...updatedValue
        }));
    }
    return (
        <div className="App">
            <h3>useState with object in React Hooks - <a href="https://www.logrocket.com">LogRocket</a></h3>
            <br />
            <label>seller:</label>
            <input type="text" name="item1" defaultValue={shopCart.seller} onChange={(e) => handleChange(e)} />
            <br></br>
            <label>saleprice:</label>
            <input type="text" name="item1" defaultValue={shopCart.salePrice} onChange={(e) => handleChange(e)} />
            <br></br>
            <label>token type:</label>
            <input type="text" name="item1" defaultValue={shopCart.TokenType} onChange={(e) => handleChange(e)} />
            <br></br>
            <label>uri:</label>
            <input type="text" name="item1" defaultValue={shopCart.uri} onChange={(e) => handleChange(e)} />
            <br></br>
            <label>tra napa:</label>
            <input type="bool" name="item1" defaultValue={shopCart.tra_napa} onChange={(e) => handleChange(e)} />
            <br></br>
            <label>set:</label>
            <input type="text" name="item1" onChange={(e) => handleChange(e)} />
            <br></br>
            <label>Output:</label>
            <pre>{JSON.stringify(shopCart, null, 2)}</pre>
        </div>
    );
}
