import React from 'react'
import { Card, Typography, Alert} from 'antd'
import { useAppSelector } from '../../store/hooks'
import { selectUser } from '../../store/authSlice'
import Layout from '../dashboard/DashboardLayout'
import StudentProfile from './components/ProfilStudent'
import PedagogProfile from './components/ProfilPedagog'
import { NAVY } from '../../styles/common'
import { useCurrentUser } from '../../hooks/auth/useGetCurrentUser'

const { Title } = Typography

const ProfilePage = () => {
  const { isLoading } = useCurrentUser()
  const user = useAppSelector(selectUser)

  if (isLoading) return <Layout><div>Duke ngarkuar...</div></Layout>

  if (!user) {
    return <Alert type="error" message="Nuk jeni të kyçur" showIcon />
  }

  const isStudent = user.role === 'student'
  const profileId = isStudent ? user.student?.stu_id : user.pedagog?.ped_id

  console.log('user:', user)
  console.log('profileId:', profileId)

  if (!profileId) {
    return (
      <Layout>
        <Alert type="warning" message="Profili nuk u gjet" showIcon />
      </Layout>
    )
  }

  return (
    <Layout>
      <div style={{ width: '100%', height: '100%' }}>
        <Title level={4} style={{ color: NAVY, marginBottom: 24 }}>
          {isStudent ? 'Profili i Studentit' : 'Profili i Pedagogut'}
        </Title>

        <Card
          bordered={false}
          style={{ borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
          bodyStyle={{ padding: '40px 48px' }}
        >
          {isStudent
            ? <StudentProfile id={profileId} />
            : <PedagogProfile id={profileId} />
          }
        </Card>
      </div>
    </Layout>
  )
}

export default ProfilePage