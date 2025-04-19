import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FaTeamspeak } from "react-icons/fa";
import { useLogin } from "../redux/useLogin";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("E-mail is required"),
  password: Yup.string().min(6, "Too short!").required("Password is required"),
});

export default function LoginPage() {
  const login = useLogin();
  const { isPending } = login;
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
        <h2 className="text-center text-2xl md:text-4xl font-extrabold text-[var(--text)]">Sign in</h2>

        <a
          href="/register"
          className="block text-center text-sm underline text-[var(--primary)] hover:opacity-80"
        >
          Don&rsquo;t have an account? Sign up
        </a>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values) => login.mutate(values)}
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
                  autoComplete="current-password"
                />
                {errors.password && touched.password && (
                  <p className="text-[var(--error)] text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary w-full disabled:opacity-60"
              >
                {isPending ? "Signing in..." : "Sign in"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="inline-flex items-center justify-center gap-10 w-full pt-4">
          <a
            href="/"
            className="text-center underline text-sm text-[var(--primary)] hover:opacity-80"
          >
            Forgot password?
          </a>
          <a
            href="/"
            className="text-center text-sm text-[var(--primary)] hover:opacity-80"
          >
            Verify email
          </a>
        </div>
      </div>
    </div>
  );
}
