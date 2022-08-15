import bodyparser from 'body-parser'
import currency from 'currency-codes'
import crypto from 'cryptocurrencies'
import express from 'express'
import request from 'request';

const app = express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.text())



app.get('/convert', (req, res)=>{
    // res.sendFile(__dirname + "/index.html")
    let coin = crypto.symbols()
    let arr=[];
    for(let i=0;i<currency.data.length;i++){
     const data=currency.data[i].code;
     arr.push(data)

    }
    
    res.write('<div></div>')
    res.write("<form action='/convert' method='post'>")
    res.write("<input type='number' name='amount'  placeholder='Enter the amount'>")
    res.write("<select name='crypto' id='crypto'>")
    res.write(`<option value="BTC">BTC</option>`)
    arr.forEach(item =>{
        res.write(`<option value=${item}>${item}</option>`)
      })
    
    res.write ("</select>")   

    res.write("<select name='fiat' id='fiat'>")
    coin.forEach(item =>{
        res.write(`<option value=${item}>${item}</option>`)
      })
    res.write ("</select>") 
    res.write("<input type='submit' value='Check' />")  
    res.write('</form>')
    res.send()
})

app.post('/convert', (req, res)=>{
    var crypto=req.body.crypto;
    var fiat=req.body.fiat;
    var amount=req.body.amount
    const options={
        url:"https://apiv2.bitcoinaverage.com/convert/global",
        method:'GET',
        qs:{
            from:crypto,
            to:fiat,
            amount:amount},
        
        headers:{
            'x-ba-key':'N2RmZDc1MTYxYjNmNGQzMWEwNjdiNWMxZTY1MWVjODg',
            json: true,
            
        }
     
    }
   request(options,function(error,response,body){
     if(response.statusCode===200){
        let parseBody=JSON.parse(body);
        // res.send(`The price of bitcoin is <b>${parseBody.price} ${crypto} in ${fiat} </b>`) 
        res.send(parseBody)
        }  
    })

    
    })

    
  



app.listen(2000,()=> {
    console.log("server running in 2000")
})