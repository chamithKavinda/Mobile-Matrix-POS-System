var customersDB = [
    {id:"C001",name:"Chamith Kavinda",address:"Galle",salaery:20000},
    {id:"C002",name:"Dasun Madushan",address:"Matara",salaery:30000},
    {id:"C003",name:"Kasun Dilshan",address:"Colombo",salaery:40000},
    {id:"C004",name:"Shehan dinusha",address:"Kandy",salaery:50000},
    {id:"C005",name:"Saduni kavindi",address:"Colombo",salaery:60000},
];

var itemsDB = [
    {code:"I001", name:"Air Pods", price: 6750.00, quantity: 50},
    {code:"I002", name:"Charger", price: 2200.00, quantity: 20},
    {code:"I003", name:"Back Cover", price: 1000.00, quantity: 20},
    {code:"I004", name:"Iphone 13 pro max", price: 200000.00, quantity: 10},
    {code:"I005", name:"Battery", price: 3000.00, quantity: 10},
]

var ordersDB = [
    {oid:"OID-001", date:"2024/06/04", customerID:"C001",
        orderDetails:[
            {oid:"OID-001", code:"I001", qty:5, payment:6000.00},
            {oid:"OID-001", code:"I002", qty:2, payment:2000.00}
        ]
    }
];
var cartDetails=[];