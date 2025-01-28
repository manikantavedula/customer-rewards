const TableHead = ({ tableHeadings }) => {
  return (
    <thead>
      <tr>
        {tableHeadings.map((heading, index) => (
          <th key={index}>{heading.label}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
