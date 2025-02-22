"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRegister, useRegisterOTP } from "@/hooks/api/useAuth";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import LoadingIndicator from "@/app/components/LoadingIndicator";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axiosClient from "@/axios-client";

const RegisterSchema = z
  .object({
    email: z.string().email("Vui lòng nhập địa chỉ email hợp lệ"),
    firstName: z.string().min(1, "Vui lòng nhập tên"),
    lastName: z.string().min(1, "Vui lòng nhập họ"),
    phoneNumber: z.string().min(1, "Vui lòng nhập số điện thoại"),
    password: z.string().min(1, "Vui lòng nhập mật khẩu"),
    rePassword: z.string().min(1, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Mật khẩu không khớp",
    path: ["rePassword"],
  });

type RegisterForm = z.infer<typeof RegisterSchema>;

export default function Register() {
  const [step, setStep] = useState(1);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRePassword, setIsShowRePassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const registerMutation = useRegister();
  const registerOTPMutation = useRegisterOTP();

  const { handleSubmit, register, formState } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    const { email, firstName, lastName, phoneNumber, password } = data;
    setEmail(email);
    registerMutation.mutate(
      {
        email,
        firstName,
        lastName,
        phoneNumber,
        password,
      },
      {
        onSuccess: (data) => {
          if (data.isSuccess) {
            toast({
              title:
                "Mã OTP đã được gửi về email của bạn, vui lòng kiểm tra email",
            });
            setStep(2);
          } else {
            toast({
              title: "Đăng ký thất bại",
              description: data.messages[0],
            });
          }
        },
      }
    );
  };

  const submitOTP = () => {
    registerOTPMutation.mutate(
      {
        email,
        verifyCode: otp,
      },
      {
        onSuccess: (data) => {
          if (data.isSuccess) {
            toast({
              title: "Đăng ký tài khoản thành công",
            });
            router.push("/login");
          }
        },
      }
    );
  };

  const resendOTP = async () => {
    const response = await axiosClient.post(
      `account/send-email-for-activeCode?email=${email}`
    );

    if (response.data.isSuccess) {
      toast({
        title: "Mã OTP đã được gửi lại, vui lòng kiểm tra email của bạn",
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      {step === 1 && (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Đăng ký</CardTitle>
            <CardDescription>
              Bạn đã có tài khoản?{" "}
              <Link href="login" className="text-blue-500 underline">
                Đăng nhập
              </Link>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id="register-form">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Email</Label>
                  <Input
                    id="email"
                    placeholder="Nhập email"
                    {...register("email")}
                  />
                  {formState.errors.email && (
                    <p className="text-red-500 text-sm">
                      {formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="lastName">Họ</Label>
                    <Input
                      id="lastName"
                      placeholder="Nhập họ"
                      {...register("lastName")}
                    />
                    {formState.errors.lastName && (
                      <p className="text-red-500 text-sm">
                        {formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="firstName">Tên</Label>
                    <Input
                      id="firstName"
                      placeholder="Nhập tên"
                      {...register("firstName")}
                    />
                    {formState.errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phoneNumber">Số điện thoại</Label>
                  <div className="flex items-center gap-2">
                    <p>+84</p>
                    <Input
                      id="phoneNumber"
                      placeholder="Nhập số điện thoại"
                      {...register("phoneNumber")}
                    />
                    {formState.errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {formState.errors.phoneNumber.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Mật khẩu</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={isShowPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      className="pr-10"
                      {...register("password")}
                    />
                    {isShowPassword ? (
                      <EyeIcon
                        className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setIsShowPassword(false)}
                      />
                    ) : (
                      <EyeClosedIcon
                        className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setIsShowPassword(true)}
                      />
                    )}
                  </div>
                  {formState.errors.password && (
                    <p className="text-red-500 text-sm">
                      {formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Xác nhận mật khẩu</Label>
                  <div className="relative">
                    <Input
                      id="rePassword"
                      type={isShowRePassword ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu"
                      className="pr-10"
                      {...register("rePassword")}
                    />
                    {isShowRePassword ? (
                      <EyeIcon
                        className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setIsShowRePassword(false)}
                      />
                    ) : (
                      <EyeClosedIcon
                        className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setIsShowRePassword(true)}
                      />
                    )}
                  </div>
                  {formState.errors.password && (
                    <p className="text-red-500 text-sm">
                      {formState.errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              form="register-form"
              disabled={registerMutation.isPending}
              className="w-full bg-[#E12E43] text-white hover:bg-[#B71C32]"
              onClick={handleSubmit(onSubmit)}
            >
              {registerMutation.isPending ? <LoadingIndicator /> : "Đăng ký"}
            </Button>
          </CardFooter>
        </Card>
      )}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Xác nhận OTP</CardTitle>
            <CardDescription>
              Nhập mã OTP được gửi về email của bạn để xác nhận đăng ký
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="text-sm mb-4">
              Bạn chưa nhận được mã OTP?{" "}
              <span
                className="text-[#E12E43] underline cursor-pointer"
                onClick={resendOTP}
              >
                Gửi lại
              </span>
            </div>
            <Button
              disabled={registerOTPMutation.isPending}
              className="w-full bg-[#E12E43] text-white hover:bg-[#B71C32]"
              onClick={submitOTP}
            >
              {registerOTPMutation.isPending ? (
                <LoadingIndicator />
              ) : (
                "Xác nhận"
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
