import React, { useEffect, useState } from "react";
import styles from "./admintable.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiFirstPage } from "react-icons/bi";
import { BiLastPage } from "react-icons/bi";

import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import EditModal from "../EditModal/EditModal";

function AdminTable({ data, searchInput }) {
  // USE EFFECT
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [searchInput]);

  // STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // VARIABLES
  let itemPerPage = 10;
  let displayData = applySearch(filteredData, searchInput);
  let totalPage = Math.ceil(displayData.length / itemPerPage);
  let startIndex = (currentPage - 1) * itemPerPage;
  let endIndex = startIndex + itemPerPage;
  const isAllSelected = selectedRows.length === itemPerPage;

  //EDITING FUNCTION
  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setIsEditModalOpen(true);
  };

  const handleEditSave = (editedAdmin) => {
    const updatedData = [...filteredData];
    const indexToBeEdited = updatedData.findIndex(
      (admin) => admin.id === editedAdmin.id
    );
    if (indexToBeEdited !== -1) {
      updatedData[indexToBeEdited] = editedAdmin;
      setFilteredData(updatedData);
    }
    setEditingAdmin(null);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setEditingAdmin(null);
  };

  // DELETE FUNCTIONS

  const handleDelete = (id) => {
    const updatedData = filteredData.filter((ele) => ele.id !== id);
    const updatedTotalPages = Math.ceil(updatedData.length / itemPerPage);

    if (currentPage > updatedTotalPages) {
      setCurrentPage(updatedTotalPages);
    }
    setFilteredData(updatedData);
    setSelectedRows([]);
  };
  const handleDeleteAllSelected = () => {
    if (selectedRows.length === 0) return;
    const updatedData = filteredData.filter(
      (admin) => !selectedRows.includes(admin.id)
    );

    const updatedTotalPages = Math.ceil(updatedData.length / itemPerPage);
    if (currentPage > updatedTotalPages) {
      setCurrentPage(updatedTotalPages);
    }
    setFilteredData(updatedData);
    setSelectedRows([]);
  };

  // CHECKBOX HANDLERS
  const handleRowCheckbox = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((admin) => admin !== id));
    }
  };
  const handleSelectAll = (event, displayData) => {
    const isAllChecked = event.target.checked;
    if (isAllChecked) {
      const startIndex = (currentPage - 1) * itemPerPage;
      let rowsSelected = [];
      for (let i = startIndex; i < startIndex + itemPerPage; i++) {
        if (i < displayData.length) rowsSelected.push(displayData[i].id);
        else rowsSelected.push(Math.random());
      }
      setSelectedRows(rowsSelected);
    } else {
      setSelectedRows([]);
    }
  };

  // PAGINATION HANDLERS
  const handleFirstPage = () => {
    setCurrentPage(1);
    setSelectedRows([]);
  };
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    setSelectedRows([]);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setSelectedRows([]);
  };
  const handleLastPage = () => {
    setCurrentPage(totalPage);
    setSelectedRows([]);
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
    setSelectedRows([]);
  };

  // NORMAL METHODS
  function applySearch(filteredData, search) {
    let updatedData = [...filteredData];

    if (search.length) {
      updatedData = updatedData.filter((admin) => {
        const searchString = search.toLowerCase();
        return (
          admin.id.toString().includes(searchString) ||
          admin.name.toLowerCase().includes(searchString) ||
          admin.email.toLowerCase().includes(searchString) ||
          admin.role.toLowerCase().includes(searchString)
        );
      });
    }

    console.log("Updated Data", updatedData);
    return updatedData;
  }

  const getPageNumbers = (totalpages) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalpages; i++) pageNumbers.push(i);
    return pageNumbers;
  };

  const pageNumber = getPageNumbers(totalPage);

  if (!data) {
    return <div>Loading......</div>;
  }

  return (
    <div className={styles.admin_table_container}>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(event) => {
                  handleSelectAll(event, displayData);
                }}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayData.slice(startIndex, endIndex).map((admins, index) => (
            <tr key={admins.id} className={styles.table_row}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(admins.id)}
                  onChange={(event) => handleRowCheckbox(event, admins.id)}
                />
              </td>
              <td className={styles.admin_name}>{admins.name}</td>
              <td>{admins.email}</td>
              <td>{admins.role}</td>
              <td>
                <div className={styles.action}>
                  <span>
                    <FiEdit onClick={() => handleEdit(admins)} />
                  </span>
                  <span className={styles.action_delete}>
                    <AiOutlineDelete onClick={() => handleDelete(admins.id)} />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Table Footer */}
      <div className={styles.table_pagination}>
        <button onClick={handleDeleteAllSelected} className={styles.deleteAll}>
          Delete Selected
        </button>
        <div className={styles.pagination_container}>
          <span>
            Page {totalPage < 1 ? 0 : currentPage} of {totalPage}
          </span>
          <div className={styles.pagination}>
            <button onClick={handleFirstPage} disabled={currentPage === 1}>
              <BiFirstPage />
              First
            </button>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <GrLinkPrevious />
              Previous
            </button>
            {/* Page Numbers */}
            {pageNumber.map((page) => (
              <button key={page} onClick={() => handlePageClick(page)}>
                {page}
              </button>
            ))}
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPage}
            >
              Next
              <GrLinkNext />
            </button>
            <button
              onClick={handleLastPage}
              disabled={currentPage === totalPage}
            >
              Last
              <BiLastPage />
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <EditModal
          admin={editingAdmin}
          handleEditSave={handleEditSave}
          handleEditClose={handleEditClose}
        />
      )}
    </div>
  );
}

export default AdminTable;
