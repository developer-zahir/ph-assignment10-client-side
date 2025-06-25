import { BadgeCheck } from "lucide-react"; // or your icon lib
import { Slide } from "react-awesome-reveal";

export default function GardenerCard({ gardener }) {
  const isActive = gardener?.status?.toLowerCase() === "active";

  return (
    <Slide direction="up" cascade triggerOnce>
      <div className="relative w-full overflow-hidden rounded-xl bg-white shadow-md dark:bg-gray-800">
        {/* badge */}
        <span
          className={`absolute right-3 top-3 flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${
            isActive ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
          }`}
        >
          <BadgeCheck className="h-4 w-4" />
          {isActive ? "Active" : "Regular"}
        </span>

        {/* banner */}
        <div className="h-30 w-full bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 dark:from-emerald-600 dark:via-green-600 dark:to-emerald-500" />

        {/* profile image */}
        <div className="absolute top-15 flex pl-5">
          <img
            src={gardener?.profileImage}
            alt={gardener?.name}
            className="h-30 w-30 rounded border-4 border-white object-cover dark:border-gray-800"
          />
        </div>

        {/* details */}
        <div className=" mt-20 pl-5 pr-5 pb-5 ">
          <h3 className="text-xl md:text-2xl mb-2.5 font-semibold text-gray-800 dark:text-white">{gardener?.name}</h3>
          <ul className="space-y-1 text-black dark:text-white ">
            <li>Age: {gardener?.age}</li>
            <li>Tips Share: {gardener?.totalSharedTips}</li>
            <li>Experiences lavel: <span className="text-gray-700 dark:text-green-500"> {gardener?.experiences}</span></li>
            <li>Expertise in:</li>
          </ul>
          <div className="mt-3 flex flex-wrap gap-2 mb-2">
            {gardener?.expertise?.map((tag, i) => (
              <span
                key={i}
                className="rounded bg-green-100 px-3 pt-1 pb-1.5 text-sm  text-green-700 dark:bg-green-200/20 dark:text-green-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* button */}
          {/* <button className="cursor-pointer mt-6 w-full rounded-lg bg-green-600 py-2 font-semibold text-white transition hover:bg-green-700">
          View Profile
        </button> */}
        </div>
      </div>
    </Slide>
  );
}
