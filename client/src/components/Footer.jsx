const Footer = () => {
  return (
    <footer className="footer f-info mt-auto">
      <div className="f-info-links d-flex justify-content-center align-items-center flex-wrap">
        <a href="#" className="mx-2">Privacy</a>
        <a href="#" className="mx-2">Terms</a>
        <a href="#" className="mx-2">Sitemap</a>
      </div>
      <div className="f-info-social d-flex justify-content-center align-items-center mt-2">
        <a href="#" className="mx-2"><i className="fa-brands fa-facebook"></i></a>
        <a href="#" className="mx-2"><i className="fa-brands fa-instagram"></i></a>
        <a href="#" className="mx-2"><i className="fa-brands fa-twitter"></i></a>
      </div>
      <div className="f-info-companyname text-center my-2">
        ExploreIt © 2024
      </div>
    </footer>
  );
};

export default Footer;

