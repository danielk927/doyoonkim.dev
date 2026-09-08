import dynamic from "next/dynamic";
import Heading from "@/components/Heading";
import { restaurants } from "@/content";

const RestaurantMap = dynamic(() => import("@/components/RestaurantMap"));

export const metadata = { title: "Food — Doyoon (Daniel) Kim" };

export default function Food() {
  const byCity = restaurants.reduce<Record<string, typeof restaurants>>(
    (acc, place) => {
      (acc[place.city] ??= []).push(place);
      return acc;
    },
    {},
  );
  const cities = Object.keys(byCity).sort();

  return (
    <>
      <h1 className="text-[2.15rem] leading-[1.25]">Food</h1>
      <p className="mt-5 max-w-[34rem] text-ink-soft">
        Everywhere I have eaten and thought about afterwards, kept in Beli and
        redrawn here.
      </p>

      <div className="mt-9">
        <RestaurantMap places={restaurants} />
      </div>

      {restaurants.length === 0 ? (
        <p className="mt-9 text-ink-soft">
          The map is empty while I transcribe the list. Beli has no export, so
          this is going in by hand.
        </p>
      ) : (
        <div className="mt-12 space-y-10">
          {cities.map((city) => (
            <section key={city}>
              <Heading>{city}</Heading>
              <ul className="space-y-2">
                {byCity[city].map((place) => (
                  <li key={place.name} className="flex items-baseline gap-3">
                    <span className="flex-1">{place.name}</span>
                    {place.score !== undefined && (
                      <span className="text-ink-soft">{place.score}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
