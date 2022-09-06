# JWT-authorization

Intermediate level implementation of JSON Web Token for authorization in Node JS application.

Features:

1. Access token and refresh token stored in cookies from backend with httpOnly.
2. Refresh token rotation as it also gets reissued while reissuing expired access token.
3. Refresh token validation by storing the unique uuid of newly generated refresh token in the datababse.
4. Password hashing with bcrypt.
5. Incoming data validation with zod.
6. Rate limiting.

To install:

1. clone it
2. cd JWT-authorization
3. cd backend
4. pnpm install
5. create MongoDB database with 'users' collection
6. pnpm run dev

Routes:

1. Register: [POST] http://localhost:5000/api/auth/register (provide email and password)
2. Login: [POST] http://localhost:5000/api/auth/login (provide email and password)
3. Profile: [GET] http://localhost:5000/api/me/profile
4. Logout: [GET] http://localhost:5000/api/auth/logout
