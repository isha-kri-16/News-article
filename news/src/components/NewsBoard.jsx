import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, fetchNews } from '../redux/features/newsSlice'; 
import NewsItem from './NewsItem';

function NewsBoard() {
    const dispatch = useDispatch();
    const { articles, loading, error, page, totalResults } = useSelector((state) => state.news);
    const pageSize = 10;
    const totalPages = Math.ceil(totalResults / pageSize);

    useEffect(() => {
        dispatch(fetchNews("general"));
    }, [dispatch, page]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            dispatch(setPage(newPage));
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center">Error fetching news: {error}</div>;
    }

    return (
        <>
            <h2 className="text-center my-4">Latest <span className="badge bg-danger">News</span></h2>
            {articles.map((news, index) => (
                <NewsItem
                    key={index}
                    title={news.title}
                    description={news.description}
                    src={news.urlToImage}
                    url={news.url}
                />
            ))}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center my-5">
                    <li className={`page-item ${page === 1 && 'disabled'}`}>
                        <button className="page-link" onClick={() => handlePageChange(page - 1)}>Previous</button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i + 1} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                        </li>
                    ))}
                    <li className={`page-item ${page === totalPages && 'disabled'}`}>
                        <button className="page-link" onClick={() => handlePageChange(page + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default NewsBoard;
