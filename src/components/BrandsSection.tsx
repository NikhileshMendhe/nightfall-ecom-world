
const brands = [
  {
    id: 1,
    name: "Tech Brand",
    logo: "https://images.unsplash.com/photo-1579869847514-7c1a19d2d2ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    name: "Fashion Brand",
    logo: "https://images.unsplash.com/photo-1520230714005-07016f9d201d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    name: "Home Brand",
    logo: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    name: "Garden Brand",
    logo: "https://images.unsplash.com/photo-1572177215152-32f247303126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 5,
    name: "Food Brand",
    logo: "https://images.unsplash.com/photo-1593504049359-74330189a345?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 6,
    name: "Beauty Brand",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];

const BrandsSection = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-6">Featured Brands</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <div 
            key={brand.id} 
            className="bg-secondary/30 rounded-md p-4 flex items-center justify-center hover:bg-secondary/50 transition-colors"
          >
            <div className="w-20 h-20 relative">
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="object-contain w-full h-full rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandsSection;
