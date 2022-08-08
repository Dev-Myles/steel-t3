import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { LoginSchema, loginSchema } from '../../../schema/login-schema';
import { trpc } from '../../../utils/trpc';

export interface ILogin {}

export const Login: React.FC<ILogin> = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(['user.login'], {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      router.push('/');
    },
  });

  function onSubmit(values: LoginSchema) {
    mutate(values);
  }

  const inputErrorStyle: string = 'focus:ring-red-400 focus:border-red-400';

  return (
    <div className="grid place-items-center h-screen">
      {session ? (
        <h1>You are already logged in</h1>
      ) : (
        <div className="bg-white p-10 w-full lg:w-1/4 rounded-lg drop-shadow-lg mx-auto text-center">
          <h1 className="align-middle text-3xl">Login</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col text-left "
          >
            {error && error.message}

            <label className="flex flex-col mb-1">
              Email
              <input
                className={errors?.email ? inputErrorStyle : ''}
                type="email"
                {...register('email')}
              />
              {errors?.email ? (
                <span className="text-red-400">Not a valid email</span>
              ) : null}
            </label>

            <label className="flex flex-col mb-1">
              Password
              <input
                className={errors?.password ? inputErrorStyle : ''}
                type="password"
                {...register('password')}
              />
              {errors?.password ? (
                <span className="text-red-400">
                  min 6-30 characters, 1 number, 1 special character
                </span>
              ) : null}
            </label>

            <input
              type="submit"
              value="Login"
              className="rounded-full mt-5 p-2 bg-cyan-600 text-white text-2xl hover:bg-cyan-700 drop-shadow-lg 
            hover: cursor-pointer transition ease-in-out"
            />
          </form>
        </div>
      )}
    </div>
  );
};
