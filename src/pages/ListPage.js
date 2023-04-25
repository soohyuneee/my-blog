import BlogList from '../components/BlogList';

function ListPage() {
	return (
		<div>
			<div className="d-flex justify-content-between">
				<h1>Blogs</h1>
			</div>
			<BlogList />
		</div>
	);
}
export default ListPage;
