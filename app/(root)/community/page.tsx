import LocalSearch from "@/components/shared/search/LocalSearch"
import Filter from "@/components/shared/search/Filter"
import { UserFilters } from "@/constants"
import { getUsers } from "@/lib/actions/user.action"
import NoResult from "@/components/shared/search/NoResult"
import UserCard from "@/components/cards/UserCard"

const Community = async () => {
    const result = await getUsers({})
  return (
    <>
        <div className='flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center'>
            <h1 className='h1-bold text-dark100_light900 max-sm:px-4'>All Users</h1>
        </div>
        <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
            <div className='flex flex-row gap-5 items-center relative w-full'>
                <LocalSearch name='users'></LocalSearch>
                <Filter filters={UserFilters}/>
          </div>
        </div>
        <section className="mt-12 flex flex-wrap gap-4">
            {result.users.length > 0
                ? (result.users.map((user) => (
                    <UserCard key={user._id} user={user}></UserCard>
                )))
                : <NoResult title="Users" description="Joint to be the first!" link="/sign-up" linkTitle="Sign Up"></NoResult>
            }
        </section>
    </>
  )
}

export default Community