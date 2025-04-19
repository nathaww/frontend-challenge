import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FaTeamspeak } from "react-icons/fa";
import { useRegister } from "../redux/useRegister";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

const registerSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("E-mail is required"),
  password: Yup.string().min(6, "Too short!").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function RegisterPage() {
  const register = useRegister();
  const { isPending } = register;
  const user = useSelector((state: RootState) => state.auth.user);

  // Redirect if user is already authenticated
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center mx-auto justify-center bg-[var(--background)]">
      <div className="max-w-lg w-full space-y-8 p-8 bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--card-border)] shadow-lg">
        <h1 className="inline-flex justify-center w-full items-center gap-2 text-center md:text-xl uppercase text-[var(--primary)] font-extrabold mb-6">
          <FaTeamspeak className="w-8 h-8" />
          Team Steam
        </h1>
        <h2 className="text-center text-2xl md:text-4xl font-extrabold text-[var(--text)]">Sign up</h2>

        <div className="text-center text-sm p-4 bg-[var(--primary)] bg-opacity-10 rounded-[var(--radius-md)] text-[var(--text)]">
          <p>Use these credentials to sign up:</p>
          <p className="font-mono mt-2">Email: eve.holt@reqres.in</p>
          <p className="font-mono">Password: pistol</p>
        </div>

        <a
          href="/login"
          className="block text-center text-sm underline text-[var(--primary)] hover:opacity-80"
        >
          Already have an account? Sign in
        </a>

        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={registerSchema}
          onSubmit={(values) => register.mutate({ 
            email: values.email, 
            password: values.password 
          })}
        >
          {({ errors, touched }) => (
            <Form className="mt-8 space-y-6">
              <div>
                <Field
                  name="email"
                  type="email"
                  className="input w-full"
                  placeholder="Email address"
                  autoComplete="email"
                />
                {errors.email && touched.email && (
                  <p className="text-[var(--error)] text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  className="input w-full"
                  placeholder="Password"
                  autoComplete="new-password"
                />
                {errors.password && touched.password && (
                  <p className="text-[var(--error)] text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <Field
                  name="confirmPassword"
                  type="password"
                  className="input w-full"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-[var(--error)] text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary w-full disabled:opacity-60"
              >
                {isPending ? "Signing up..." : "Sign up"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}