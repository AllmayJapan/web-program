CREATE TABLE post_categories (
	post_id INT NOT NULL,
	category_id INT NOT NULL,
	PRIMARY KEY (post_id, category_id),
	FOREIGN KEY (post_id) REFERENCES posts(post_id),
	FOREIGN KEY (category_id) REFERENCES categories(category_id)
)
