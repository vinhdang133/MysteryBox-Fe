import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/provider/global-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ImageUploader } from "./ImageUpload";
import { useUpdateAccount } from "@/hooks/api/useAccount";
import dayjs from "dayjs";
import { toast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

const UpdateProfileSchema = z.object({
  firstName: z.string().min(1, "Vui lòng nhập tên"),
  lastName: z.string().min(1, "Vui lòng nhập họ"),
  gender: z.string().optional(),
});

type UpdateProfileForm = z.infer<typeof UpdateProfileSchema>;

export default function FormUpdateProfile() {
  const { user, setUser } = useContext(GlobalContext);
  const [dob, setDob] = useState<Date | undefined>(new Date());
  const [image, setImage] = useState("");

  const updateAccountMutation = useUpdateAccount();

  const { handleSubmit, register, formState, setValue } =
    useForm<UpdateProfileForm>({
      defaultValues: {
        firstName: user?.firstName,
        lastName: user?.lastName,
      },
      resolver: zodResolver(UpdateProfileSchema),
    });

  const onsubmit = (data: UpdateProfileForm) => {
    updateAccountMutation.mutate(
      {
        accountId: user?.id || "",
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender === "1" ? true : false,
        dob: dob?.toISOString() || dayjs().toISOString(),
        image: image,
      },
      {
        onSuccess: (data) => {
          toast({
            title: "Cập nhật thông tin thành công!",
          });
          setUser(data.result);
        },
      }
    );
  };

  useEffect(() => {
    setValue("firstName", user?.firstName || "");
    setValue("lastName", user?.lastName || "");
    setValue("gender", user?.gender ? "1" : "0");
    setDob(new Date(user?.dob || ""));
    setImage(user?.avatar || "");
  }, [setValue, user]);

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      onSubmit={handleSubmit(onsubmit)}
    >
      <div className="col-span-2 flex items-center justify-center">
        <ImageUploader
          onChange={(url) => setImage(url)}
          value={image || user?.avatar}
          defaultValue={user?.avatar}
          className="w-24 h-24 rounded-full"
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Tên</Label>
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
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Họ</Label>
        <Input id="lastName" placeholder="Nhập họ" {...register("lastName")} />
        {formState.errors.firstName && (
          <p className="text-red-500 text-sm">
            {formState.errors.firstName.message}
          </p>
        )}
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Giới tính</Label>
        <Select
          {...register("gender")}
          value={user?.gender ? "1" : "0"}
          defaultValue={user?.gender ? "1" : "0"}
          onValueChange={(value) => setValue("gender", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Chọn giới tính" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Nam</SelectItem>
            <SelectItem value="0">Nữ</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="name">Ngày sinh</Label>
        <Popover>
          <PopoverTrigger className="px-2 py-1 text-sm rounded-md border border-gray-300 flex justify-between items-center">
            <p>{dayjs(dob).format("DD/MM/YYYY")}</p>
            <CalendarIcon />
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={dob}
              onSelect={setDob}
              className="rounded-md border w-fit"
            />
          </PopoverContent>
        </Popover>
      </div>
      <Button
        type="submit"
        className="col-span-2 bg-[#E12E43] text-white hover:bg-[#B71C32]"
      >
        Cập nhật
      </Button>
    </form>
  );
}
