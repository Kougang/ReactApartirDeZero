// ici il est question de concevoir une petite app et de pouvoir
// appliquer un system de recherche dessus

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];
// function ProductRowComponent({product})
const ProductRow = React.memo(({ product }) => {
  const name = product.stocked ? (
    product.name
  ) : (
    <span className="text-danger">{product.name}</span>
  );

  console.log("render");
  //  wait(500);

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
});

// const ProductRow = React.memo(ProductRowComponent)

function ProductCategorieRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category} </th>
    </tr>
  );
}

function ProductTable({ products, inStockOnly, filterText }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      (inStockOnly && !product.stocked) ||
      (filterText != "" && product.name.indexOf(filterText) === -1)
    ) {
      return;
    }

    if (product.category !== lastCategory) {
      lastCategory = product.category;
      rows.push(
        <ProductCategorieRow key={lastCategory} category={lastCategory} />
      );
    }

    rows.push(<ProductRow key={product.name} product={product} />);
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix</th>
        </tr>
      </thead>

      <tbody>{rows}</tbody>
    </table>
  );
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleInStockOnlyChange(e) {
    this.props.onStockChange(e.target.checked);
  }

  render() {
    const { filterText, inStockOnly } = this.props;
    return (
      <div className="mb-3">
        <div className="from-group">
          <input
            type="text"
            value={filterText}
            onChange={this.handleFilterTextChange}
            className="form-control"
            placeholder="Rechercher"
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={this.handleInStockOnlyChange}
            className="form-check-input"
            id="stock"
          ></input>
          <label htmlFor="stock" className="form-check-label">
            Produit en stock seulement
          </label>
        </div>
      </div>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: true,
    };
    (this.handleFilterTextChange = this.handleFilterTextChange.bind(this)),
      (this.handleInStockOnlyChange = this.handleInStockOnlyChange.bind(this));
  }

  // la methode ci dessous est une methode predefinie qui agit dans le composant actuele
  // en effet il return vrai ou faux pour dire si on peut mettre a jour ou pas le composant courant,
  // la valeur false verouille le composant et ainsi on ne peut effectuer des modifs.
  // cette methode prends en entree deux parametres a savoir : nextProps et nextState a utiliser en foncion du besoin qui se pose
  /*  shouldComponentUpdate(nextProps,nextState)
  {
    return false
  }
*/

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.products !== this.props.products ||
      nextState.filterText !== this.state.filterText ||
      nextState.inStockOnly != this.state.inStockOnly
    );
  }

  handleFilterTextChange(filterText) {
    this.setState({ filterText });
  }

  handleInStockOnlyChange(inStockOnly) {
    this.setState({ inStockOnly });
  }

  render() {
    const { products } = this.props;
    console.log("dans render");
    return (
      <React.Fragment>
        {JSON.stringify(this.state)}

        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onStockChange={this.handleInStockOnlyChange}
        />

        <ProductTable
          products={products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </React.Fragment>
    );
  }
}

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.querySelector("#app")
);
