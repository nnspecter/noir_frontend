"use client"

import { useState, FormEvent } from 'react'
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import styles from './LoginForm.module.scss'
import { MountAnimation } from '@/shared/animations/MountAnimation'

interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = () => {
  //Показ - скрытие паролей
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  //Данные формы
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  //Ошибки параллельно данным
  const [errors, setErrors] = useState<RegistrationData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  //Видимость паролей
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev)
  }
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev)
  }

  //Проверка на ошибки формы
  const validate = () => {
    const newErrors: Record<keyof RegistrationData, string> = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
    let isValid = true

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters long'
      isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      isValid = false
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
      isValid = false
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validate()) {
      console.log('Form is valid, sending data:', formData)
    }
  }


  return (
    <MountAnimation>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.cardContent}>
            
            <div className={styles.header}>
              <div className={styles.avatar}>
                <PersonAddOutlinedIcon />
              </div>
              <h1 className={styles.title}>Create an account</h1>
              <span className={styles.subtitle}>
                Get started by creating your account.
              </span>
            </div>

            <form onSubmit={handleSubmit} className={styles.formContainer}>
              <TextField
                label="Full Name"
                type="text"
                fullWidth
                variant="outlined"
                autoComplete="name"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />

              <TextField
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                autoComplete="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                autoComplete="new-password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                error={!!errors.password}
                helperText={errors.password}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end" aria-label="Toggle password visibility">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                variant="outlined"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleToggleConfirmPassword} edge="end" aria-label="Toggle password visibility">
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button type="submit" variant="contained" size="large" fullWidth sx={{ mt: 1 }}>
                Sign up
              </Button>

              <div className={styles.footer}>
                Already have an account?{' '}
                <a href="/login" className={styles.link}>
                  Sign in
                </a>
              </div>
            </form>

          </div>
        </div>
      </div>
    </MountAnimation>
  )
}