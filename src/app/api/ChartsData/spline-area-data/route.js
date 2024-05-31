// app/api/spline-area-data/route.js
export async function GET(req) {
  const data = {
    series: [
      {
        name: "Series 1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  };

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
