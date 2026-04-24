import React, { useEffect } from 'react'
import { Modal, Form, Input, Select, Button } from 'antd'
import { useUpdatePedagog } from '../../../hooks/pedagog/useUpdatePedagog'

const { Option } = Select

interface EditPedagogModalProps {
  open: boolean
  onClose: () => void
  pedagog: {
    ped_id: string
    ped_em: string
    ped_mb: string
    ped_email: string
    ped_tel: string
    ped_tit: string
    ped_gjin: string
  }
}

const EditPedagogModal = ({ open, onClose, pedagog }: EditPedagogModalProps) => {
  const [form] = Form.useForm()
  const { mutate: updatePedagog, isPending } = useUpdatePedagog()

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        ped_em: pedagog.ped_em,
        ped_mb: pedagog.ped_mb,
        ped_email: pedagog.ped_email,
        ped_tel: pedagog.ped_tel,
        ped_tit: pedagog.ped_tit,
        ped_gjin: pedagog.ped_gjin,
      })
    }
  }, [open, pedagog, form])

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      updatePedagog(
        { id: pedagog.ped_id, payload: values },
        {
          onSuccess: () => {
            onClose()
          },
        }
      )
    })
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={
        <span>
          <span style={{ marginRight: 8 }}>✏️</span>
          Ndrysho profilin
        </span>
      }
      footer={[
        <Button key="cancel" onClick={onClose}>
          Anulo
        </Button>,
        <Button key="submit" type="primary" loading={isPending} onClick={handleSubmit}>
          Ruaj ndryshimet
        </Button>,
      ]}
      width={560}
    >
      <Form form={form} layout="vertical" style={{ marginTop: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <Form.Item label="Emri" name="ped_em" rules={[{ required: true, message: 'Emri është i detyrueshëm' }]}>
            <Input placeholder="Emri" />
          </Form.Item>

          <Form.Item label="Mbiemri" name="ped_mb" rules={[{ required: true, message: 'Mbiemri është i detyrueshëm' }]}>
            <Input placeholder="Mbiemri" />
          </Form.Item>
        </div>

        <Form.Item label="Email" name="ped_email" rules={[{ required: true, type: 'email', message: 'Email i pavlefshëm' }]}>
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item label="Telefon" name="ped_tel">
          <Input placeholder="Telefon" />
        </Form.Item>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
          <Form.Item label="Titulli akademik" name="ped_tit">
            <Select>
              <Option value="Prof.Dr.">Prof.Dr.</Option>
              <Option value="Dr.">Dr.</Option>
              <Option value="Prof.As.Dr.">Prof.As.Dr.</Option>
              <Option value="Msc.">Msc.</Option>
              <Option value="Doc.">Doc.</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Gjinia" name="ped_gjin">
            <Input disabled />
          </Form.Item>
        </div>

        <p style={{ fontSize: 12, color: '#888' }}>
          ⓘ Fushat e grisura nuk mund të ndryshohën nga pedagogi.
        </p>
      </Form>
    </Modal>
  )
}

export default EditPedagogModal