function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-4 rounded shadow">Stock Value: $500</div>
        <div className="bg-white p-4 rounded shadow">Today's Sales: $200</div>
        <div className="bg-white p-4 rounded shadow">Low Stock: 3 items</div>
      </div>
    </div>
  );
}

export default Dashboard;