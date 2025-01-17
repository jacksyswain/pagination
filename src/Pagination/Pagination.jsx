import React, { useState, useEffect } from "react";

const PaginationApp = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        alert("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  // Calculate indices for slicing data
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < Math.ceil(data.length / rowsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Data</h1>
      <table
       
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          borderBottom: "2px solid #34eb7a"
        }}
      >
        <thead style={{backgroundColor:"#34eb7a",color:"white",fontSize:"20px"}}>
          <tr>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }} >ID</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Name</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Email</th>
            <th style={{ borderBottom: "1px solid #ccc", padding: "8px" }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.length > 0 ? (
            currentData.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button
          onClick={handlePrevious}
          className="Previous"
          style={{
            backgroundColor:"#34eb7a",
            color:"white",
            marginRight: "10px",
            padding: "8px 16px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>
        <span style={{fontSize:"25px", backgroundColor:"#34eb7a",
            color:"white",}}>{currentPage}</span>
        <button
          onClick={handleNext}
          className="Next"
          style={{
            backgroundColor:"#34eb7a",
            color:"white",
            marginLeft: "10px",
            padding: "8px 16px",
            cursor:
              currentPage === Math.ceil(data.length / rowsPerPage)
                ? "not-allowed"
                : "pointer",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationApp;
