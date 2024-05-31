// app/api/chartData/route.js
export async function GET(req) {
  const data = {
    series: [40, 30, 20, 10],
    labels: ["Product A", "Product B", "Product C", "Product D"],
  };

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
