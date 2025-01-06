import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";
import CommonLogo from "@/components/Others/authentication/common/CommonLogo";
import { Col, Container, Row } from "reactstrap";
import Link from "next/link";
import { Facebook, Linkedin, Twitter } from "react-feather";
import {
  CreateAccount,
  DoNotAccount,
  EmailAddress,
  EnterEmailPasswordLogin,
  ForgotPassword,
  Password,
  RememberPassword,
  SignIn,
  SignInAccount,
  SignInWith,
  TwitterHeading,
  linkedInHeading,
  FacebookHeading,
} from "utils/Constant";
import { login } from "@/redux/services/authService";
import { withAuth } from "@/middlewares/AuthMiddleware";

const Login = () => {
  const [showPassWord, setShowPassWord] = useState(false);
  const [formValues, setFormValues] = useState({
    userID: "",
    password: "",
  });
  const { userID, password } = formValues;

  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    message,
    error,
    jwToken,
    loading,
    succeeded,
    userTypeId,
  } = useAppSelector((state) => state.authreducer);

  const handleUserValue = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const formSubmitHandle = (event: FormEvent) => {
    event.preventDefault();

    if (!userID || !password) {
      toast.error("Please enter both username and password.", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    dispatch(
      login(formValues, () => {
        if (jwToken && succeeded === true) {
          toast.success(message, {
            position: "top-right",
            autoClose: 2000,
          });
        } else {
          toast.error(message, {
            position: "top-right",
            autoClose: 2000,
          });
        }
      })
    );
  };

  if (jwToken) {
    toast.success(message, {
      position: "top-right",
      autoClose: 2000,
    });
    
    router.push("/dashboard/default");
  }

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs={12} className="p-0">
          <div className="login-card login-dark">
            <div>
              <CommonLogo />
              <div className="login-main">
                <form className="theme-form">
                  <h4>{SignInAccount}</h4>
                  <p>{EnterEmailPasswordLogin}</p>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      type="email"
                      required
                      placeholder="Enter your Username"
                      value={userID}
                      name="userID"
                      onChange={handleUserValue}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{Password}</Label>
                    <div className="form-input position-relative">
                      <Input
                        type={showPassWord ? "text" : "password"}
                        placeholder="*********"
                        onChange={handleUserValue}
                        value={password}
                        name="password"
                      />
                      <div className="show-hide">
                        <span
                          onClick={() => setShowPassWord(!showPassWord)}
                          className={!showPassWord ? "show" : ""}
                        />
                      </div>
                    </div>
                  </FormGroup>
                  {error && <p style={{ color: "red" }}>{error}</p>}{" "}
                  {/* Display error */}
                  <FormGroup className="mb-0 form-group">
                    {/* <div className="checkbox p-0">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" htmlFor="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div> */}
                    {/* <Link
                      className="link"
                      href="/pages/authentication/forget-pwd"
                    >
                      {ForgotPassword}
                    </Link> */}
                    <div className="text-end mt-3">
                      <Button
                        color="primary"
                        className="btn-block w-100"
                        type="submit"
                        onClick={formSubmitHandle}
                        disabled={loading}
                      >
                        {loading ? "Signing in..." : SignIn}{" "}
                        {/* Show loading state */}
                      </Button>
                    </div>
                  </FormGroup>
                  {/* <h6 className="text-muted mt-4 or">{SignInWith}</h6> */}
                  {/* <div className="social mt-4">
                    <div className="btn-showcase">
                      <a
                        className="btn btn-light"
                        href="https://www.linkedin.com/login"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Linkedin className="txt-linkedin" /> {linkedInHeading}
                      </a>
                      <a
                        className="btn btn-light"
                        href="https://twitter.com/login?lang=en"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Twitter className="txt-twitter" />
                        {TwitterHeading}
                      </a>
                      <a
                        className="btn btn-light"
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Facebook className="txt-fb" />
                        {FacebookHeading}
                      </a>
                    </div>
                  </div> */}
                  {/* <p className="mt-4 mb-0 text-center">
                    {DoNotAccount}
                    <Link
                      className="ms-2"
                      href="/pages/authentication/register-simple"
                    >
                      {CreateAccount}
                    </Link>
                  </p> */}
                </form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default withAuth(Login);
