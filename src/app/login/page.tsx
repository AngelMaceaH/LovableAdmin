"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { loginAction } from "@/api/actions/login";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  user: z.string().min(2, "El usuario es obligatorio"),
  password: z.string().min(4, "La contraseña es obligatoria"),
});
const images = [
  "/img/bg/bg1.jpg",
  "/img/bg/bg2.jpg",
  "/img/bg/bg3.jpg",
  "/img/bg/bg4.jpg",
  "/img/bg/bg5.jpg",
  "/img/bg/bg6.jpg",
  "/img/bg/bg7.jpg",
];

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { user: "", password: "" },
  });
  const { setError } = form;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await loginAction(
      values.user.toUpperCase(),
      values.password
    );

    if (!result.success) {
      toast.error(result.message);

      setError("user", {
        type: "manual",
        message: " ",
      });

      setError("password", {
        type: "manual",
        message: " ",
      });

      return;
    }
    toast.success("¡Inicio de sesión exitoso!");
    router.push("/");
    router.refresh();
  }
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-8 bg-slate-100">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center py-8">
              <div className="relative w-64 h-16">
                <Image
                  src="/img/logo.webp"
                  alt={`Logo`}
                  priority={true}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain block"
                />
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="user"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 text-lg">
                      Usuario
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                          <FontAwesomeIcon icon={faUser} />
                        </span>
                        <Input
                          placeholder="Ingresa tu usuario"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-600 text-lg">
                      Contraseña
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                          <FontAwesomeIcon icon={faLock} />
                        </span>
                        <Input
                          type="password"
                          placeholder="Ingresa tu contraseña"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-slate-700 hover:bg-slate-800"
              >
                Iniciar sesión
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="hidden md:block relative w-full h-screen">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: current === index ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={src}
              alt={`Background ${index}`}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
