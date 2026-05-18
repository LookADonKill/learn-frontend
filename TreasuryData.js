const arr = [ 
    {
    id: "TXN00001",
    customer: "David Dobrick",
    amount: 1200.50,
    date: "2025-04-01",
    type: "credit"
    },
    {
    id: "TXN00123",
    customer: "Martin Garing",
    amount: 420.50,
    date: "2025-03-01",
    type: "debit"
    },
    {
    id: "TXN00112",
    customer: "Leeroy Grong",
    amount: 1450.50,
    date: "2025-02-01",
    type: "credit"
    },
    {
    id: "TXN00331",
    customer: "Arvin Kota",
    amount: 565.20,
    date: "2024-05-01",
    type: "debit"
    },
    {
    id: "TXN00423",
    customer: "Josep Gronk",
    amount: 12250.70,
    date: "2020-03-21",
    type: "credit"
    },
    {
    id: "TXN00028",
    customer: "John Martin",
    amount: 2450.50,
    date: "2025-07-11",
    type: "debit"
    },
    {
    id: "TXN00253",
    customer: "Maroon Glearg",
    amount: 3230.50,
    date: "2019-05-28",
    type: "debit"
    },
    {
    id: "TXN00152",
    customer: "Hill Kigger",
    amount: 1450.50,
    date: "2015-02-05",
    type: "debit"
    },
    {
    id: "TXN00371",
    customer: "Melanie Rosie",
    amount: 3257.20,
    date: "2025-04-01",
    type: "debit"
    },
    {
    id: "TXN00223",
    customer: "Johe Brink",
    amount: 6250.75,
    date: "2025-04-01",
    type: "debit"
    },
    {
    id: "TXN00056",
    customer: "Devil Dolick",
    amount: 1205.55,
    date: "2025-07-01",
    type: "credit"
    },
    {
    id: "TXN12255",
    customer: "Kevin Johnson",
    amount: 4325.75,
    date: "2023-08-01",
    type: "debit"
    },
    {
    id: "TXN04567",
    customer: "Lerp Pink",
    amount: 3750.36,
    date: "2021-02-23",
    type: "credit"
    },
    {
    id: "TXN02331",
    customer: "Daffa Kelvinsky",
    amount: 325.20,
    date: "2024-05-01",
    type: "debit"
    },
    {
    id: "TXN30423",
    customer: "Jolie Grock",
    amount: 2250.43,
    date: "2010-02-21",
    type: "credit"
    },
    {
    id: "TXN10058",
    customer: "Keldon Martin",
    amount: 3550.35,
    date: "2015-07-21",
    type: "credit"
    },
    {
    id: "TXN00253",
    customer: "Mareen Blorg",
    amount: 3256.73,
    date: "2018-03-28",
    type: "debit"
    },
    {
    id: "TXN12152",
    customer: "Kloaka Nuggets",
    amount: 1250.58,
    date: "1998-03-15",
    type: "debit"
    },
    {
    id: "TXN50371",
    customer: "Daisy Davis",
    amount: 3357.20,
    date: "2012-11-11",
    type: "debit"
    },
    {
    id: "TXN70223",
    customer: "Joke Lenk",
    amount: 6254.75,
    date: "2024-04-17",
    type: "debit"
    },
    {
    id: "TXN12752",
    customer: "Nicholas Kepas",
    amount: 12820.58,
    date: "2009-03-15",
    type: "credit"
    },
    {
    id: "TXN50881",
    customer: "Damian Clints",
    amount: 557.20,
    date: "2017-11-11",
    type: "debit"
    },
    {
    id: "TXN72323",
    customer: "Bella Ruth",
    amount: 138.75,
    date: "2012-07-17",
    type: "credit"
    },
    {
    id: "TXN57575",
    customer: "Cassidy Kletus",
    amount: 323.25,
    date: "1994-03-11",
    type: "debit"
    },
    {
    id: "TXN70223",
    customer: "Becca Kendrick",
    amount: 354.75,
    date: "2025-12-21",
    type: "debit"
    },
    {
    id: "TXN12722",
    customer: "Anya Felicia",
    amount: 220.58,
    date: "2009-05-17",
    type: "credit"
    },
    {
    id: "TXN50841",
    customer: "Peter Beethoven",
    amount: 157.20,
    date: "2016-12-08",
    type: "debit"
    },
    {
    id: "TXN05234",
    customer: "Juan Xavier",
    amount: 537.53,
    date: "2004-05-23",
    type: "debit"
    }
];

const state = {
    currPage: 1,
    searchTerm: '',
    searchMethod: 'Linear',
    sortBase: 'Amount',
    sortMethod: 'Simple',
    totalTransaction: 100,
    transactionPerPage: 10,
    allTransaction: [],
    filteredTransaction: []
};