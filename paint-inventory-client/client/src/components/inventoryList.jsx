const InventoryList = ({ folders }) => {
  console.log('Rendering folders with items:', folders); // Log folder data

  return (
    <div>
      <h2>Folders</h2>
      {folders.length > 0 ? (
        folders.map((folder) => (
          <div key={folder._id}>
            <h3>{folder.name}</h3>
            <ul>
              {folder.items.length > 0 ? (
                folder.items.map((item) => (
                  <li key={item._id}>
                    {item.item} - Quantity: {item.quantity}
                  </li>
                ))
              ) : (
                <li>No items in this folder</li>
              )}
            </ul>
          </div>
        ))
      ) : (
        <p>No folders available</p>
      )}
    </div>
  );
};

export default InventoryList;
