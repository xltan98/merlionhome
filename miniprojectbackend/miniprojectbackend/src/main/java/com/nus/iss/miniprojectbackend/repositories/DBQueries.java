package com.nus.iss.miniprojectbackend.repositories;

public class DBQueries {
   

        public static final String SQL_UPDATE_APPOINTMENT_STATUS="""
                UPDATE userappointment SET status=? where appointment_id=?
                """;

        
         public static final String SQL_DELETE_APPOINTMENT_BY_ID= """
                        DELETE FROM userappointment
                        WHERE appointment_id = ?
                        """;

        public static final String SQL_INSERT_IDEAL_HOME = """
                        INSERT INTO userhome (user_id, year, town, flat_type, storey_range,floor_area_sqm, flat_model, remaining_lease,predicted_value) VALUES
                        (?, ?, ?, ?, ?, ?, ?,?,?)
                        """;
        public static final String SQL_INSERT_LISTING_APPOINTMENT="""
                        INSERT INTO userappointment(agent_id,customer_id,address,date,time,status,upload_id) VALUES
                        (?,?,?,?,?,?,?)
                """;
        
        public static final String SQL_USER_GET_APPOINTMENT = """
                        SELECT *
                        FROM userappointment
                        WHERE customer_id = ?
                        """;

        public static final String SQL_USER_GET_APPOINTMENT_AGENT = """
                        SELECT *
                        FROM userappointment
                        WHERE agent_id = ?
                        """;

        public static final String SQL_FIND_HOME_BY_ID = """
                        SELECT * FROM userhome WHERE user_id=? ORDER BY predicted_value ASC
                        """;

        
        public static final String SQL_DELETE_IDEAL_HOME_BY_ID= """
                        DELETE FROM userhome
                        WHERE id = ?
                        """;

        public static final String SQL_INSERT_SAVING = """
                        INSERT INTO usersaving (user_id,save_date,saving) VALUES
                        (?, ?, ?)
                        """;

        public static final String SQL_GET_TOTAL_SAVING = """
                        SELECT user_id, SUM(saving) AS total_savings
                        FROM usersaving
                        where user_id= ?;
                        """;
         public static final String SQL_FIND_SAVING_ID = """
                        SELECT * FROM usersaving WHERE user_id=?
                        """;

        public static final String SQL_MENU_UPDATE_PRODUCT_IMAGE = """
                        UPDATE products SET
                        image_url = ?
                        WHERE id = ?
                        """;

        public static final String SQL_MENU_UPDATE_PRODUCT_MODIFIER = """
                        UPDATE product_modifiers SET
                        name = ?,
                        min_required = ?,
                        max_allowed = ?
                        WHERE id = ?
                        """;

        public static final String SQL_MENU_UPDATE_PRODUCT_MODIFIER_OPTION = """
                        UPDATE product_modifier_options SET
                        name = ?,
                        additional_price = ?
                        WHERE id = ?
                        """;

        public static final String SQL_ORDER_INSERT_PAYMENT = """
                        INSERT INTO payments (
                            shop_id, order_id, payment_mode, external_payment_id, external_payment_request_id, paid_amount, timestamp
                        ) VALUES (?, ?, ?, ?, ?, ?, ?)
                        """;

        public static final String SQL_USER_GET_DETAILS = """
                        SELECT *
                        FROM user
                        WHERE lower(id) = ?
                        """;

        public static final String SQL_USER_UPDATE_DETAILS = """
                        UPDATE user SET
                        name = ?,
                        phone = ?,
                        email = ?
                        WHERE
                        id = ?
                        """;

        public static final String SQL_USER_CHANGE_PASSWORD = """
                        UPDATE user SET
                        password = ?
                        WHERE
                        id = ?;
                        """;

        public static final String SQL_SHOP_INSERT_USER = """
                        INSERT INTO user (id, name, phone, email, password,role)
                        VALUES (?, ?, ?, ?, ?,?);
                        """;

        public static final String SQL_SHOP_GET_SAMPLE = """
                        SELECT shops.id as id, shops.name as name, COUNT(products.id) as num_products
                        FROM shops
                        RIGHT JOIN products ON shops.id = products.shop_id
                        GROUP BY shops.id
                        HAVING COUNT(products.id) > 3
                        ORDER BY num_products DESC
                        LIMIT 10;
                        """;
}
