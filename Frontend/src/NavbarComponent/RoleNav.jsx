import AdminHeader from "./AdminHeader";
import DeliveryHeader from "./DeliveryHeader";
import HeaderUser from "./HeaderUser";
import NormalHeader from "./NormalHeader";
import SellerHeader from "./SellerHeader";

const RoleNav = () => {
  const user = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const deliveryPerson = JSON.parse(sessionStorage.getItem("active-delivery"));
  const seller = JSON.parse(sessionStorage.getItem("active-seller"));

  return (
    <div className="d-flex align-items-center gap-2">  {/* Added consistent spacing */}
      {user != null ? (
        <HeaderUser />
      ) : admin != null ? (
        <AdminHeader />
      ) : seller != null ? (
        <SellerHeader />
      ) : deliveryPerson != null ? (
        <DeliveryHeader />
      ) : (
        <NormalHeader />
      )}
    </div>
  );
};

export default RoleNav;