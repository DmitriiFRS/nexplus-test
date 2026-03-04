import { RegisterForm } from "../../features/auth/ui/RegisterForm";

const RegisterPage: React.FC = () => {
	return (
		<div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
			<RegisterForm />
		</div>
	);
};

export default RegisterPage;
