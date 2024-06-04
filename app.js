// //
// //
// //
// //
// //
// //
// // // app.js
// //
// // const createError = require('http-errors');
// //
// // const express = require('express');
// // const path = require('path');
// // const cookieParser = require('cookie-parser');
// // const logger = require('morgan');
// // const sqlite3 = require('sqlite3').verbose();
// //
// // const app = express();
// //
// // // Connect to SQLite database
// // const dbPath = path.join(__dirname, 'db', 'we.db');
// // const db = new sqlite3.Database(dbPath, (err) => {
// //     if (err) {
// //         console.error('Failed to connect to the database.');
// //         console.error(err.message);
// //     } else {
// //         console.log('Connected to the SQLite database at ' + dbPath);
// //         db.run(`CREATE TABLE IF NOT EXISTS products (
// //       id INTEGER PRIMARY KEY AUTOINCREMENT,
// //       date TEXT NOT NULL,
// //       name TEXT NOT NULL,
// //       price REAL NOT NULL
// //     )`, (err) => {
// //             if (err) {
// //                 console.error('Failed to create products table.');
// //                 console.error(err.message);
// //             } else {
// //                 console.log('Ensured products table exists.');
// //             }
// //         });
// //     }
// // });
// //
// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'pug');
// //
// // app.use(logger('dev'));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));
// // app.use(cookieParser());
// // app.use(express.static(path.join(__dirname, 'public')));
// //
// // // Route to serve the HTML file
// // app.get('/', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// // });
// //
// // // Route to add a new product
// // app.post('/add-product', (req, res) => {
// //     const { date, name, price } = req.body;
// //
// //     // Function to convert date format
// //     function convertDateFormat(inputDate) {
// //         const dateObj = new Date(inputDate);
// //         const year = (dateObj.getFullYear() - 1911).toString(); // Convert to ROC year
// //         const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // Pad to two digits
// //         const day = dateObj.getDate().toString().padStart(2, '0'); // Pad to two digits
// //         return year + '/' + month + '/' + day;
// //     }
// //
// //     // Convert date format to ROC format
// //    // const convertedDate = convertDateFormat(date);
// //    // console.log(convertedDate);
// //     // Insert into the database
// //     db.run(`INSERT INTO products (date, name, price) VALUES (?, ?, ?)`, [date, name, price], function(err) {
// //         if (err) {
// //             console.error('Failed to insert product into database.');
// //             console.error(err.message);
// //             res.status(500).send('Failed to add product.');
// //         } else {
// //             res.send('Product added successfully!');
// //         }
// //     });
// // });
// //
// //
// // // Add a new route to handle product searches
// // app.get('/search', (req, res) => {
// //     const name = req.query.name;
// //     const startDate = req.query.start;
// //     const endDate = req.query.end;
// //
// //     // 转换日期格式的函数
// //     function convertDateFormat(inputDate) {
// //         const dateObj = new Date(inputDate);
// //         const year = (dateObj.getFullYear() - 1911).toString(); // 转换成民国年份
// //         const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // 补零至两位数
// //         const day = dateObj.getDate().toString().padStart(2, '0'); // 补零至两位数
// //         return year + '/' + month + '/' + day;
// //     }
// //
// //     // 将日期格式转换为民国年份格式
// //     const convertedStartDate = convertDateFormat(startDate);
// //     const convertedEndDate = convertDateFormat(endDate);
// //
// //     // 执行数据库查询
// //     db.all(`SELECT * FROM products WHERE name LIKE ? AND date BETWEEN ? AND ?`, [`%${name}%`, convertedStartDate, convertedEndDate], (err, rows) => {
// //         if (err) {
// //             console.error('Failed to retrieve products from database.');
// //             console.error(err.message);
// //             res.status(500).send('Failed to retrieve products.');
// //         } else {
// //             // 将日期数据转换成 formatted_date 格式
// //             const productsWithFormattedDate = rows.map(product => {
// //                 return {
// //                     ...product,
// //                     formatted_date: product.date
// //                 };
// //             });
// //             res.json(productsWithFormattedDate);
// //         }
// //     });
// // });
// //
// //
// // // Route to retrieve all products
// // app.get('/products', (req, res) => {
// //     db.all(`SELECT * FROM products`, (err, rows) => {
// //         if (err) {
// //             console.error('Failed to retrieve products from database.');
// //             console.error(err.message);
// //             res.status(500).send('Failed to retrieve products.');
// //         } else {
// //             res.json(rows);
// //         }
// //     });
// // });
// //
// // // Catch 404 and forward to error handler
// // app.use(function(req, res, next) {
// //     next(createError(404));
// // });
// //
// // // Error handler
// // app.use(function(err, req, res, next) {
// //     res.locals.message = err.message;
// //     res.locals.error = req.app.get('env') === 'development' ? err : {};
// //     res.status(err.status || 500);
// //     res.render('error');
// // });
// //
// // module.exports = app;
// //
// const createError = require('http-errors');
// const express = require('express');
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const sqlite3 = require('sqlite3').verbose();
//
// const app = express();
//
// // Connect to SQLite database
// const dbPath = path.join(__dirname, 'db', 'we.db');
// const db = new sqlite3.Database(dbPath, (err) => {
//     if (err) {
//         console.error('Failed to connect to the database.');
//         console.error(err.message);
//     } else {
//         console.log('Connected to the SQLite database at ' + dbPath);
//         db.run(`CREATE TABLE IF NOT EXISTS products (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       date TEXT NOT NULL,
//       name TEXT NOT NULL,
//       price REAL NOT NULL
//     )`, (err) => {
//             if (err) {
//                 console.error('Failed to create products table.');
//                 console.error(err.message);
//             } else {
//                 console.log('Ensured products table exists.');
//             }
//         });
//         db.run(`CREATE TABLE IF NOT EXISTS img (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT NOT NULL,
//       path TEXT NOT NULL
//     )`, (err) => {
//             if (err) {
//                 console.error('Failed to create img table.');
//                 console.error(err.message);
//             } else {
//                 console.log('Ensured img table exists.');
//             }
//         });
//     }
// });
//
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// // Route to serve the HTML file
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
//
// // Route to add a new product
// app.post('/add-product', (req, res) => {
//     const { date, name, price } = req.body;
//
//     // Insert into the database
//     db.run(`INSERT INTO products (date, name, price) VALUES (?, ?, ?)`, [date, name, price], function(err) {
//         if (err) {
//             console.error('Failed to insert product into database.');
//             console.error(err.message);
//             res.status(500).send('Failed to add product.');
//         } else {
//             res.send('Product added successfully!');
//         }
//     });
// });
// app.post('/add-product2', (req, res) => {
//     const { path, name } = req.body;
//
//     db.run(`INSERT INTO img (name, path) VALUES (?, ?)`, [name, path], function(err) {
//         if (err) {
//             console.error('Failed to insert image path into database.');
//             console.error(err.message);
//             res.status(500).send('Failed to add product.');
//         } else {
//             res.send('Product added successfully!');
//         }
//     });
// });
// // Route to handle product searches
// app.get('/search', (req, res) => {
//     const name = req.query.name;
//     const startDate = req.query.start;
//     const endDate = req.query.end;
//
//     // 转换日期格式的函数
//     function convertDateFormat(inputDate) {
//         const dateObj = new Date(inputDate);
//         const year = (dateObj.getFullYear() - 1911).toString(); // 转换成民国年份
//         const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // 补零至两位数
//         const day = dateObj.getDate().toString().padStart(2, '0'); // 补零至两位数
//         return year + '/' + month + '/' + day;
//     }
//
//     // 将日期格式转换为民国年份格式
//     const convertedStartDate = convertDateFormat(startDate);
//     const convertedEndDate = convertDateFormat(endDate);
//
//     // 执行数据库查询
//     db.all(`SELECT * FROM products WHERE name LIKE ? AND date BETWEEN ? AND ?`, [`%${name}%`, convertedStartDate, convertedEndDate], (err, rows) => {
//         if (err) {
//             console.error('Failed to retrieve products from database.');
//             console.error(err.message);
//             res.status(500).send('Failed to retrieve products.');
//         } else {
//             // 将日期数据转换成 formatted_date 格式
//             const productsWithFormattedDate = rows.map(product => {
//                 return {
//                     ...product,
//                     formatted_date: product.date
//                 };
//             });
//
//             db.get('SELECT path FROM img WHERE name = ?', [name], (err, row) => {
//                 if (err) {
//                     return res.status(500).json({ error: err.message });
//                 }
//                 const imagePath = row ? row.path : null;
//                 res.json({ products: productsWithFormattedDate, imagePath });
//             });
//         }
//     });
// });
//
// // Route to retrieve all products
// app.get('/products', (req, res) => {
//     db.all(`SELECT * FROM products`, (err, rows) => {
//         if (err) {
//             console.error('Failed to retrieve products from database.');
//             console.error(err.message);
//             res.status(500).send('Failed to retrieve products.');
//         } else {
//             res.json(rows);
//         }
//     });
// });
//
// // Catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });
//
// // Error handler
// app.use(function(err, req, res, next) {
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//     res.status(err.status || 500);
//     res.render('error');
// });
//
// module.exports = app;
//
//


const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// 連接到SQLite數據庫
const dbPath = path.join(__dirname, 'db', 'we.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('無法連接到數據庫。');
        console.error(err.message);
    } else {
        console.log('已連接到SQLite數據庫: ' + dbPath);
        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            name TEXT NOT NULL,
            price REAL NOT NULL
        )`, (err) => {
            if (err) {
                console.error('創建 products 表失敗。');
                console.error(err.message);
            } else {
                console.log('確保 products 表已存在。');
            }
        });
        db.run(`CREATE TABLE IF NOT EXISTS img (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            path TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('創建 img 表失敗。');
                console.error(err.message);
            } else {
                console.log('確保 img 表已存在。');
            }
        });
    }
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由：服務HTML文件
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 路由：新增產品
app.post('/add-product', (req, res) => {
    const { date, name, price, path: imagePath } = req.body;

    db.run(`INSERT INTO products (date, name, price) VALUES (?, ?, ?)`, [date, name, price], function(err) {
        if (err) {
            console.error('將產品插入數據庫失敗。');
            console.error(err.message);
            res.status(500).send('新增產品失敗。');
        } else {
            db.run(`INSERT INTO img (name, path) VALUES (?, ?)`, [name, imagePath], function(err) {
                if (err) {
                    console.error('將圖片路徑插入數據庫失敗。');
                    console.error(err.message);
                    res.status(500).send('新增產品失敗。');
                } else {
                    res.send('產品新增成功！');
                }
            });
        }
    });
});

// 路由：處理產品搜索
app.get('/search', (req, res) => {
    const name = req.query.name;
    const startDate = req.query.start;
    const endDate = req.query.end;

    function convertDateFormat(inputDate) {
        const dateObj = new Date(inputDate);
        const year = (dateObj.getFullYear() - 1911).toString();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObj.getDate().toString().padStart(2, '0');
        return year + '/' + month + '/' + day;
    }

    const convertedStartDate = convertDateFormat(startDate);
    const convertedEndDate = convertDateFormat(endDate);

    db.all(`SELECT * FROM products WHERE name LIKE ? AND date BETWEEN ? AND ?`, [`%${name}%`, convertedStartDate, convertedEndDate], (err, rows) => {
        if (err) {
            console.error('從數據庫檢索產品失敗。');
            console.error(err.message);
            res.status(500).send('檢索產品失敗。');
        } else {
            const productsWithFormattedDate = rows.map(product => ({
                ...product,
                formatted_date: product.date
            }));

            db.get('SELECT path FROM img WHERE name = ?', [name], (err, row) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                const imagePath = row ? row.path : null;
                res.json({ products: productsWithFormattedDate, imagePath });
            });
        }
    });
});

// 路由：檢索所有產品
app.get('/products', (req, res) => {
    db.all(`SELECT * FROM products`, (err, rows) => {
        if (err) {
            console.error('從數據庫檢索產品失敗。');
            console.error(err.message);
            res.status(500).send('檢索產品失敗。');
        } else {
            res.json(rows);
        }
    });
});

// 捕捉404錯誤並轉發到錯誤處理器
app.use(function(req, res, next) {
    next(createError(404));
});

// 錯誤處理器
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

