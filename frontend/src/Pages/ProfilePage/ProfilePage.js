import React from 'react'
import ProfileHeader from '../../Components/ProfileHeader/ProfileHeader'
import ProfileSummary from '../../Components/ProfileSummary/ProfileSummary'
import ProfileSkills from '../../Components/ProfileSkills/ProfileSkills'
import ProfilePortfolio from '../../Components/ProfilePortofolio/ProfilePortfolio'
import ProfileSideBar from '../../Components/ProfileSideBar/ProfileSideBar'

function ProfilePage() {
  return (
    <div>
        <div className="App bg-gray-100 min-h-screen p-8">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
                 <div className="w-[30%] flex-shrink-0">
                    <ProfileSideBar/>
                </div>
                <div className="col-span-2">
                    <ProfileHeader />
                    <ProfileSummary />
                    <ProfileSkills />
                    <ProfilePortfolio />
                </div>

            </div>
        </div>
    </div>
  )
}

export default ProfilePage