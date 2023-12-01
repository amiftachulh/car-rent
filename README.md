# How to run the project locally

1. Create MySQL Database with name `car_rent`.
2. Copy `.env.example` and rename it to `.env` only.
3. Open `.env` and change `DATABASE_URL` if needed.

```bash
# with password
DATABASE_URL="mysql://root:password@localhost:3306/car_rent"

# without password
DATABASE_URL="mysql://root@localhost:3306/car_rent"
```

4. Run `npm install` to install all dependencies.
5. Run `npx prisma db push` to push the schema to database.
6. Run `npx prisma db seed` to seed the database.
7. Run `npm run dev` to start the app.

> **Admin**\
> Username : admin\
> Password : password

> **User**\
> Username : user\
> Password : password
