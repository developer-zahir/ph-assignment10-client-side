import React, { useContext, useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import CTASection from "../../components/CTASection/CTASection";
import PageTitle from "../../components/PageTitle/PageTitle";
import { AuthContent } from "../../contexts/Authcontext";
import NoData from "../../components/NoData/NoData";
import Loading from "../../components/Loading/Loading";
import TipsTable from "./TipsTable";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyTips = () => {
  const { user } = useContext(AuthContent);
  const [loading, setLoading] = useState(true);
  const [myTips, setMyTips] = useState([]);

  useEffect(() => {
    fetch(`https://garden-hub-three.vercel.app/all-tips`)
      .then((res) => res.json())
      .then((data) => {
        // filter current user post
        const filteredData = data.filter((tip) => tip?.userEmail === user?.email);
        setMyTips(filteredData.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://garden-hub-three.vercel.app/my-tips/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = myTips.filter((tip) => tip._id !== id);
              setMyTips(remaining);
              Swal.fire("Deleted!", "Your tip has been deleted.", "success");
              toast.success("Tip deleted successfully!");
            }
          })
          .catch((err) => {
            console.error("Error deleting tip:", err);
            Swal.fire("Error!", "Failed to delete tip.", "error");
            toast.error("Failed to delete tip.");
          });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle title="My Tips"></PageTitle>

      <section className="py-15 md:py-17 bg-green-50 dark:bg-gray-900">
        <div className="max-w-screen-xl px-2 mx-auto">
          <Fade direction="up" triggerOnce>
            <h2 className="text-3xl mb-4 md:text-4xl font-semibold md:font-bold text-center text-black dark:text-white">My Garden Tips</h2>
            <p className="text-center   mb-10 text-gray-700 dark:text-white">
              You Sign In as
              <span className="text-green-600"> {user?.displayName}</span>
            </p>
          </Fade>

          {/* tips card */}
          <Fade direction="up" triggerOnce>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {myTips.length > 0 ? <TipsTable myTips={myTips} handleDelete={handleDelete} /> : <NoData />}
            </div>
          </Fade>
        </div>
      </section>

      {/* cta */}
      <CTASection
        title={"Explore our coumunity active gardeners"}
        cta={"Explore Gardeners"}
        desc={
          "We believe in a thriving community of gardeners who share their knowledge and experiences. Join our community today and connect with like-minded individuals who are passionate about gardening."
        }
        link={"/all-gardeners"}
      />
    </>
  );
};

export default MyTips;
