import express from "express";

import authRoutes from "./Routes/AuthRoutes.js";
import userRoutes from "./Routes/UserRoutes.js";
import cors from "cors";


const app = express();

app.use(express.json());

// app.post("/auth/sign-up", async (req, res) => {
//   const userCreateSchema = z.object({
//     email: z.email(),
//     firstName: z.string().min(3),
//     lastName: z.string().min(3),

//     password: z.string().min(8),
//   });

//   const { success, data, error } = userCreateSchema.safeParse(req.body);

//   if (!success) {
//     return res
//       .status(400)
//       .json({ message: "Validation failed", errors: error.flatten() }); // Fixed
//   }

//   const passwordHash = await bcrypt.hash(data.password, 10);

//   const user = {
//     firstName: data.firstName,
//     lastName: data.lastName,
//     email: data.email,
//     passwordHash: passwordHash,
//   };

//   const createdUser = await prisma.user.create({
//     data: user,
//   });

//   res.status(201).json({
//     // 201 for creation
//     status: "success",
//     message: "User created successfully",
//     data: { user: createdUser },
//   });
// });

// app.post("/auth/sign-in", async (req, res) => {
//      const userSignInSchema = z.object({
//             email: z.email(),
//             password: z.string().min(8),
//         });

//         const { success, data, error } = userSignInSchema.safeParse(req.body);

//         if (!success) {
//             return res.status(400).json({ message: 'Validation failed', data: z.flattenError(error) });
//         }

//         const user = await prisma.user.findUnique({
//             where: {
//                 email: data.email
//             }
//         });

//         if (!user) {
//             return res.status(404).json({ status: 'error', message: 'User not found' });
//         }

//         const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

//         if (!isPasswordValid) {
//             return res.status(401).json({ status: 'error', message: 'Invalid password' });
//         }

//         const secretKey = process.env.JWT_SECRET;

//         const accessToken = jwt.sign({ sub: user.id }, secretKey, { expiresIn: '7d' });

//         res.json({
//             status: 'success',
//             message: 'User signed in successfully',
//             data: { accessToken }
//         });
// });
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("server is ready");
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
