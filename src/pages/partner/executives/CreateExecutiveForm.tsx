import { Button, FormInput, Modal, Typography } from "@components/general";
import { useCreatePartnerExecutiveMutation } from "@features/api";
import { Lock } from "lucide-react";
import { FC, useState } from "react";
import { toast } from "react-toastify";
interface ICreateExecutiveForm {
  isOpen: boolean;
  onClose: () => void;
}
export const CreateExecutiveForm: FC<ICreateExecutiveForm> = ({
  isOpen,
  onClose,
}) => {
  const [createPartnerExecutive] = useCreatePartnerExecutiveMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      console.log("form data", formData);

      const response = await createPartnerExecutive({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        address: formData.address,
      }).unwrap();
      toast.success(
        response.message || `Partner Executive created successfully!`
      );
      onClose();
    } catch (error: any) {
      console.error(`Failed to create Partner Executive:`, error);
      toast.error(error?.message || `Failed to create Partner Executive.`);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full lg:w-1/2 mx-5">
      <Typography variant="h4" className="mb-4 text-center">
        Fill executive details:
      </Typography>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          startIcon={<Lock className="h-5 w-5 text-gray-400" />}
          type="text"
          placeholder="Enter executive name"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
        />
        <FormInput
          label="Email"
          startIcon={<Lock className="h-5 w-5 text-gray-400" />}
          type="email"
          placeholder="Enter executive email"
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
        <FormInput
          label="Phone"
          startIcon={<Lock className="h-5 w-5 text-gray-400" />}
          type="number"
          placeholder="Enter executive phone number"
          value={formData.phone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          required
        />
        <FormInput
          label="Address"
          startIcon={<Lock className="h-5 w-5 text-gray-400" />}
          type="text"
          placeholder="Enter executive address"
          value={formData.address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, address: e.target.value })
          }
          required
        />
        <FormInput
          label="Password"
          startIcon={<Lock className="h-5 w-5 text-gray-400" />}
          type="text"
          placeholder="••••••••"
          value={formData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <Button type="submit">Create Executive</Button>
      </form>
    </Modal>
  );
};
