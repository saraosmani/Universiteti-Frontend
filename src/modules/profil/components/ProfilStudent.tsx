import React from 'react'
import { Typography, Tag, Spin, Alert, Avatar, Divider, Row, Col } from 'antd'
import {
  UserOutlined, MailOutlined, CalendarOutlined,
  IdcardOutlined, ManOutlined, WomanOutlined,
} from '@ant-design/icons'
import { useGetStudentById } from '../../../hooks/student/useGetStudentById';
import { NAVY } from '../../../styles';
import { formatDate } from '../../../utils/utils';
import { InfoItem, iconStyle } from './InfoItem';

const { Title, Text } = Typography

const StudentProfile = ({ id }: { id: string }) => {
  const { data: student, isLoading, error } = useGetStudentById(id)

  if (isLoading) return <Spin size="large" />
  if (error)    return <Alert type="error"   message="Gabim gjatë ngarkimit" description={error.message} showIcon />
  if (!student) return <Alert type="warning" message="Studenti nuk u gjet" showIcon />

  const initials    = `${student.stu_em?.[0] ?? ''}${student.stu_mb?.[0] ?? ''}`.toUpperCase()
  const statusColor = student.stu_status === 'Aktiv' ? 'green' : 'red'
  const GenderIcon  = student.stu_gjini === 'M' ? ManOutlined : WomanOutlined

  return (
    <Row gutter={48} align="middle" style={{ minHeight: 320 }}>
      <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
        <Avatar size={128} style={{ backgroundColor: NAVY, fontSize: 40, fontWeight: 700 }}>
          {initials || <UserOutlined />}
        </Avatar>
        <div style={{ marginTop: 20 }}>
          <Title level={4} style={{ margin: 0, color: NAVY }}>
            {student.stu_em} {student.stu_mb}
          </Title>
          <div style={{ marginTop: 14 }}>
            <Tag color={statusColor} style={{ borderRadius: 20, padding: '4px 16px', fontSize: 13 }}>
              {student.stu_status}
            </Tag>
          </div>
        </div>
      </Col>

      <Col flex="none">
        <Divider type="vertical" style={{ height: 300 }} />
      </Col>

      <Col xs={24} sm={14}>
        <InfoItem icon={<MailOutlined  style={iconStyle} />} label="Email"                value={student.stu_email} />
        <InfoItem icon={<IdcardOutlined style={iconStyle} />} label="Numri Matrikullimit" value={student.stu_nuid} />
        <InfoItem icon={<GenderIcon    style={iconStyle} />} label="Gjinia"               value={student.stu_gjini === 'M' ? 'Mashkull' : 'Femër'} />
        <InfoItem icon={<CalendarOutlined style={iconStyle} />} label="Data e Lindjes"    value={formatDate(student.stu_dl)} />
        <InfoItem icon={<CalendarOutlined style={iconStyle} />} label="Data e Regjistrimit" value={formatDate(student.stu_dat_regjistrim)} />
      </Col>
    </Row>
  )
}

export default StudentProfile