import LocalSearch from "@/components/shared/search/LocalSearch"
import Filter from "@/components/shared/search/Filter"
import { TagFilters} from "@/constants"
import NoResult from "@/components/shared/search/NoResult"
import { getAllTags } from "@/lib/actions/tag.action"
import Link from "next/link"
import TagPageCard from "@/components/cards/TagPageCard"

const TagsPage = async () => {
    const result = await getAllTags({})
  return (
    <>
        <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
            <h1 className='h1-bold text-dark100_light900 max-sm:px-4'>All Tags</h1>
        </div>
        <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
            <div className='flex flex-row gap-5 items-center relative w-full'>
                <LocalSearch name='tags'></LocalSearch>
                <Filter filters={TagFilters}/>
          </div>
        </div>
        <section className="mt-12 flex flex-wrap gap-4"> 
            {result.tags.length > 0
                ? (result.tags.map((tag) => (
                    <Link href={`/tags/${tag._id}`} key={tag._id} className="shadow-light100_darknone">
                        <TagPageCard tag={tag}></TagPageCard>
                    </Link>
                )))
                : <NoResult title="Tags" description="Be the first to add a tag!" link="/ask" linkTitle="Ask a Question"></NoResult>
            }
        </section>
    </>
  )
}

export default TagsPage