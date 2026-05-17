import { prisma } from "../Database/prisma.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignUp = async (req, res) => {
  const userCreateSchema = z.object({
    email: z.email(),
    firstName: z.string().min(3),
    lastName: z.string().min(3),

    password: z.string().min(8),
  });

  const { success, data, error } = userCreateSchema.safeParse(req.body);

  if (!success) {
    return res
      .status(400)
      .json({ message: "Validation failed", data: z.flattenError(error) });
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    passwordHash: passwordHash,
  };

  const createdUser = await prisma.user.create({
    data: user,
  });

  const secretKey = process.env.JWT_SECRET;
  const accessToken = jwt.sign({ sub: createdUser.id }, secretKey, {
    expiresIn: "7d",
  });

  res.json({
    status: "success",
    message: "User created successfully",
    data: { accessToken },
  });
};

export const userSignIn = async (req, res) => {
  const userSignInSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
  });

  const { success, data, error } = userSignInSchema.safeParse(req.body);

  if (!success) {
    return res
      .status(400)
      .json({ message: "Validation failed", data: z.flattenError(error) });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ status: "error", message: "Invalid password" });
  }

  const secretKey = process.env.JWT_SECRET;

  const accessToken = jwt.sign({ sub: user.id }, secretKey, {
    expiresIn: "7d",
  });

  res.json({
    status: "success",
    message: "User signed in successfully",
    data: { accessToken },
  });
};

export const getCurrentUser = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }

  const accessToken = authHeader.split(" ")[1];
  const secretKey = process.env.JWT_SECRET;

  let decoded;
  try {
    decoded = jwt.verify(accessToken, secretKey);
  } catch (err) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }

  const userId = decoded.sub;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    omit: {
      passwordHash: true,
    },
  });

  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  res.json({
    status: "success",
    message: "User fetched successfully",
    data: { user },
  });
};
