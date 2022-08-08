// import { useRouter } from 'next/router';
// import { TokenSchema } from '../../../schema/token-schema';
// import { trpc } from '../../../utils/trpc';

// export interface IEmailConfirmed {}

// const EmailConfirmed: React.FC<IEmailConfirmed> = () => {
//   const router = useRouter();

//   function redirect() {
//     setTimeout(() => {
//       router.push('/');
//     }, 5000);
//   }

//   const { mutate, error } = trpc.useMutation(['user.email-confirmed'], {
//     onError: (error) => {
//       console.log(error);
//     },
//     onSuccess: () => {
//       redirect();
//     },
//   });

//   const hash = router.asPath.split('#token=')[1];
//   const token: TokenSchema = {
//     token: '',
//   };
//   if (hash) {
//     token.token = hash;
//   }

//   mutate(token);

//   return (
//     <div className="grid place-items-center h-screen">
//       {error && error.message ? (
//         <div className="w-11/12 text-center">
//           <h1 className="font-bold text-red-400 text-7xl">Bad request</h1>
//           <p className="text-3xl mt-3 text-red-500">
//             <br />
//             <u>{error.message}</u> <br />
//             You will be redirected to the home page in 5 seconds.
//           </p>
//         </div>
//       ) : (
//         <div className="w-fit ">
//           <h1 className="font-bold text-cyan-900 text-7xl">
//             Thank you for Confirming your email!
//           </h1>
//           <p className="text-3xl mt-3">
//             Your account has been activated. You now have full access to the
//             site!
//             <br />
//             You will be redirected to the home page in 5 seconds.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmailConfirmed;

export {};
