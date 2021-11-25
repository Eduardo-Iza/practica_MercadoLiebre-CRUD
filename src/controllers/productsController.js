const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	products: (req, res) => {
		res.render('products', { products })

	},

	// Detail - Detail from one product
	detail: (req, res) => {
		idProd = req.params.id;
		producto = products.find(function (product) {
			return product.id == idProd;
		});
		finalPrice = producto.price - producto.price * producto.discount / 100;
		res.render('detail', { producto, finalPrice })

	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res) => {
		let newProd = {
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description
		}

		res.send(newProd);
		// 		res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		idProd = req.params.id;
		producto = products.find(function (product) {
			return product.id == idProd;
		});
		res.render('product-edit-form', { producto })
	},
	// Update - Method to update         
	update: (req, res) => {
		res.send(req.body)

		//		res.render('product-edit-form')
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		idProd = req.params.id;
		producto = products.find(function (product) {
			return product.id == idProd;
		});

		res.send(producto.name + ' destruido!!!');
	}
};

module.exports = controller;