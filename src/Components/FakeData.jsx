import React, { useEffect, useRef, useState } from "react"

function FakeData() {
    const [companyData, setCompanyData] = useState([])
    const [pageNo, setPageNo] = useState(1)

    const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    }

    const lastElement = useRef(null)

    function callbackFn(entries) {
        const [ entry ] = entries
        if (entry.isIntersecting) {
            setPageNo((prev) => prev + 1)
        }
    }

    useEffect(() => {
        function fetchData() {
            const promise = fetch(`https://api.unsplash.com/photos?page=${pageNo}&client_id=BZUlyuVA0HzXmOxbbghdJQ5eQJI_Nw-DgX2JEzgpz-Y`)
            promise
                .then((response) => response.json())
                .then((response) => setCompanyData(prev => [...prev, ...response]))
                .catch((err) => console.log(err))
        }
        fetchData()
    }, [pageNo])

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFn, options)
        const lastEl = lastElement.current
        if (lastElement.current) observer.observe(lastElement.current)

        return (()=> {
            if (lastEl) {
                observer.unobserve(lastEl)
            }
        })
    }, [lastElement, options])

    return (
        <div>
            {
                companyData.map((company, index) => {
                    if (companyData.length - 1 === index) {
                        return (
                            <div ref={lastElement} style={{ padding: '10rem' }}>
                                {company.id}
                            </div>
                        )
                    }
                    return (
                        <div style={{ padding: '10rem' }}>
                            {company.id}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FakeData