import { useEffect, useState } from "react";
import "../pages/styles/index.css";

const API_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

const getPageNumbers = (totalPages, currentPage) => {
  if (totalPages <= 10)
    return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pages = [1, 2];

  if (currentPage > 5) pages.push("...");

  const middlePages = [currentPage - 1, currentPage, currentPage + 1].filter(
    (p) => p > 2 && p < totalPages - 1
  );

  pages.push(...middlePages);

  if (currentPage < totalPages - 4) pages.push("...");

  pages.push(totalPages - 1, totalPages);

  return pages;
};

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const totalPages = Math.ceil(projects.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = projects.slice(indexOfFirstRecord, indexOfLastRecord);

  const goToPage = (page) => setCurrentPage(page);

  return (
    <div>
      <div className="align-center">
        <h2 className="heading">Highly Rated Kickstarter Projects</h2>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Percentage Funded</th>
              <th>Amount Pledged</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((project, index) => (
              <tr key={indexOfFirstRecord + index}>
                <td>{project["s.no"]}</td>
                <td>{project["percentage.funded"]}%</td>
                <td>{project["amt.pledged"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      {totalPages > 1 && (
        <div className="pagination-container">
          {getPageNumbers(totalPages, currentPage).map((page, index) => (
            <span
              key={index}
              onClick={() => page !== "..." && goToPage(page)}
              className={`pagination-item ${page === "..." ? "dots" : ""} ${
                currentPage === page ? "active" : ""
              }`}
            >
              {page}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
