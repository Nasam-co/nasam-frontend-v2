import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import {
  AuthService,
  type LoginCredentials,
} from "@/features/auth/services/auth";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setUser, isAuthenticated, storeUserData } = useAuthStore();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const loginSchema = z.object({
    email: z.string().email(t("auth.emailValidation")),
    password: z.string().min(6, t("auth.passwordValidation")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/overview", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      const loginData = {
        ...data,
        email: data.email.toLowerCase(),
      };
      const user = await AuthService.login(loginData);
      setUser(user);
      storeUserData(user);
      toast.success(t("auth.welcomeBack", { name: user.name }));
      // navigate("/overview", { replace: true });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[--color-nasam-light] via-background to-[--color-nasam-cream] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("auth.welcome")}
          </h1>
          <p className="text-muted-foreground">{t("auth.pleaseSignIn")}</p>
        </div>

        {/* Login Form */}
        <Card className="p-8 border-border bg-card/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                {t("auth.email")}
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className={cn(
                  "w-full px-3 py-2 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[--color-nasam-accent] focus:border-transparent transition-all",
                  errors.email ? "border-red-500" : "border-input"
                )}
                placeholder="admin@nasam.com"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                {t("auth.password")}
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={cn(
                    "w-full px-3 py-2 pr-10 border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[--color-nasam-accent] focus:border-transparent transition-all",
                    errors.password ? "border-red-500" : "border-input"
                  )}
                  placeholder={t("auth.passwordPlaceholder")}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-secondary text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t("auth.signingIn")}
                </>
              ) : (
                t("auth.loginButton")
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
