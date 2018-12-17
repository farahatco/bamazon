create table departments(
	department_id    int auto_increment primary key,
    department_name     varchar(100),
    over_head_costs    float
	);
	insert into departments(department_name,over_head_costs) values
	("computer",2500),
	("Dress",1400),
	("Mechanic",6500),
	("Appliances",4200)
create table products(
    item_id  int auto_increment primary key,
	product_name   varchar(100),
    department_id  int references departments(department_id),
    price  int default 0,
    stock_quantity  int default 0,
	product_sales int default 0 
	);
	
	insert into products(product_name,department_id,price,stock_quantity)
	values("laptop",1,435,220),
	("Mouse",1,13.99,3000),
	("HDD",1,55,1450),
	("Shirt",2,10.99,500),
	("Pants",2,19.99,1200),
	("Filters",3,7,5000),
	("Tyres",3,33.69,400),
	("Battery ",3,80,240),
	("Oven",4,77,100),
	("Cleaner",4,28,600);
	alter table products add product_sales float;
	
    select p.department_id,d.department_name,d.over_head_costs,p.product_sales
	from products p , departments d
	where p.department_id = d.department_id;
	create table people(
	id int auto_increment primary key,
	name     varchar(50),
	age      int);
	insert into people(name,age) values("jay",30),
	("mo",40),
	("aman",30),
	("eric",27),
	("mm",27),
	("alysa",20),
	("povan",27),
	("many",40),
	("mark",30),
	("nic",30)
	);
	
	
		
	select abs((select(avg(age)) from people) - age) Actual_Diff from people order by id