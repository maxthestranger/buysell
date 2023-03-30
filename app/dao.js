import db from "./db";

// PRODUCTS
// Create a new product
export const createProduct = (
  name,
  userId,
  price,
  description,
  status,
  image,
  categoryId
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO products (name, user_id, price, description, status, image, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, userId, price, description, status, image, categoryId],
      (_, result) => {
        console.log("New product inserted with ID:", result.insertId);
      },
      (_, error) => {
        console.error("Error inserting new product:", error);
      }
    );
  });
};

// Get all products
export const getProducts = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM products",
      [],
      (_, result) => {
        callback(result.rows._array);
      },
      (_, error) => {
        console.error("Error getting products:", error);
      }
    );
  });
};

// Get a product
export const getProduct = (productId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM products WHERE id = ?",
      [productId],
      (_, result) => {
        callback(result.rows._array);
      },
      (_, error) => {
        console.error("Error getting product:", error);
      }
    );
  });
};

// Get products by user
export const getProductsByUser = (userId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM products WHERE user_id = ?",
      [userId],
      (_, result) => {
        callback(result.rows._array);
      },
      (_, error) => {
        console.error("Error getting products by user:", error);
      }
    );
  });
};

// Get products by category
export const getProductsByCategory = (categoryId, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM products WHERE category_id = ?",
      [categoryId],
      (_, result) => {
        callback(result.rows._array);
      },
      (_, error) => {
        console.error("Error getting products by category:", error);
      }
    );
  });
};

// Update a product
export const updateProduct = (
  productId,
  name,
  price,
  description,
  status,
  image
) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE products SET name = ?, price = ?, description = ?, status = ?, image = ? WHERE id = ?",
      [name, price, description, status, image, productId],
      (_, result) => {
        console.log("Product updated");
      },
      (_, error) => {
        console.error("Error updating product:", error);
      }
    );
  });
};

// Delete a product
export const deleteProduct = (productId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM products WHERE id = ?",
      [productId],
      (_, result) => {
        console.log("Product deleted");
      },
      (_, error) => {
        console.error("Error deleting product:", error);
      }
    );
  });
};

// CATEGORIES
// Create a new category
export const createCategory = (name, color, image, productCount) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO categories (name, color, image, product_count) VALUES (?, ?, ?, ?)",
      [name, color, image, productCount],
      (_, result) => {
        console.log("New category inserted with ID:", result.insertId);
      },
      (_, error) => {
        console.error("Error inserting new category:", error);
      }
    );
  });
};

// Get all categories
export const getCategories = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM categories",
      [],
      (_, result) => {
        callback({success: true, categories: result.rows._array});
      },
      (_, error) => {
        console.error("Error getting categories:", error);
      }
    );
  });
};

// PURCHASE REQUESTS
// Create a new purchase request
export const createPurchaseRequest = (buyerId, userId, productId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO purchase_requests (buyer_id, user_id, status, product_id) VALUES (?, ?, ?, ?)",
      [buyerId, userId, "pending", productId],
      (_, result) => {
        console.log("New purchase request inserted with ID:", result.insertId);
      },
      (_, error) => {
        console.error("Error inserting new purchase request:", error);
      }
    );
  });
};

// Get all purchase requests
export const getPurchaseRequests = (callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM purchase_requests",
      [],
      (_, result) => {
        callback(result.rows._array);
      },
      (_, error) => {
        console.error("Error getting purchase requests:", error);
      }
    );
  });
};

// Accept a purchase request
export const acceptPurchaseRequest = (purchaseRequestId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE purchase_requests SET status = ? WHERE id = ?",
      ["accepted", purchaseRequestId],
      (_, result) => {
        console.log("Purchase request accepted");
      },
      (_, error) => {
        console.error("Error accepting purchase request:", error);
      }
    );
  });
};

// Decline a purchase request
export const declinePurchaseRequest = (purchaseRequestId) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE purchase_requests SET status = ? WHERE id = ?",
      ["declined", purchaseRequestId],
      (_, result) => {
        console.log("Purchase request declined");
      },
      (_, error) => {
        console.error("Error declining purchase request:", error);
      }
    );
  });
};

// USERS
// Register a new user
export const registerUser = (
  name,
  role,
  phone,
  email,
  location,
  password,
  callback
) => {
  // Check if user already exists
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (_, result) => {
        if (result.rows.length > 0) {
          // User already exists
          callback({ success: false, message: "User already exists" });
        } else {
          // User does not exist, create new user
          db.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO users (name, role, phone, email, location, password) VALUES (?, ?, ?, ?, ?, ?)",
              [name, role, phone, email, location, password],
              (_, result) => {
                console.log("New user inserted with ID:", result.insertId);
                callback({
                  success: true,
                  user: {
                    id: result.insertId,
                    name,
                    role,
                    phone,
                    email,
                    location,
                    password,
                  },
                });
              },
              (_, error) => {
                console.error("Error inserting new user:", error);
                callback({
                  success: false,
                  message: "An error occurred while registering",
                });
              }
            );
          });
        }
      },
      (_, error) => {
        console.error("Error checking if user already exists:", error);
        callback({
          success: false,
          message: "An error occurred while registering",
        });
      }
    );
  });
};

// Log in a user with email and password
export const loginUser = (email, password, callback) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      (_, result) => {
        if (result.rows.length > 0) {
          // User exists and credentials match
          const user = result.rows.item(0);
          callback({ success: true, user });
        } else {
          // User does not exist or credentials do not match
          callback({ success: false, message: "Invalid email or password" });
        }
      },
      (_, error) => {
        console.error("Error logging in user:", error);
        callback({
          success: false,
          message: "An error occurred while logging in",
        });
      }
    );
  });
};
