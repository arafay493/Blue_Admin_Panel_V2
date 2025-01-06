import CommonErrorPage from "@/components/Others/Error/common/CommonErrorPage";

const Error404 = () => {
  return (
    <CommonErrorPage
      tittle={404}
      tittleClassName="font-primary"
      BtnClassName="btn-primary-gradien"
    />
  );
};

export default Error404;
